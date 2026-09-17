/**
 * useCarousel — Apple-design physics hook
 *
 * Principles from the apple-design skill:
 *  §1  Response         – feedback on pointerdown, continuous during drag
 *  §2  Direct manip.    – 1:1 tracking, grab-offset-aware, setPointerCapture
 *  §3  Interruptibility – springs started from the live presentation value
 *  §4  Springs          – critically damped default; bounce only on momentum flick
 *  §5  Velocity handoff – release velocity fed into the spring's initial velocity
 *  §6  Momentum proj.   – Apple's exponential-decay project(), clamped to ±1 card
 *  §9  Rubber-banding   – progressive boundary resistance
 *  §14 Reduced motion   – instant snaps instead of springs
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValue, animate } from 'framer-motion';

// ─── Apple's momentum-projection (WWDC 2018 sample code) ─────────────────────
// Lower decelerationRate = snappier, less travel. 0.996 keeps it controlled
// so a normal swipe doesn't overshoot on a narrow mobile screen.
function project(initialVelocity /* px/s */, decelerationRate = 0.996) {
  return (initialVelocity / 1000) * decelerationRate / (1 - decelerationRate);
}

// ─── Apple's rubber-band formula ─────────────────────────────────────────────
function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

// ─── Velocity ring buffer ─────────────────────────────────────────────────────
const VELOCITY_SAMPLES = 5;
function makeVelocityTracker() {
  const samples = [];
  return {
    reset() { samples.length = 0; },
    record(x) {
      samples.push({ x, t: performance.now() });
      if (samples.length > VELOCITY_SAMPLES) samples.shift();
    },
    velocity() {
      if (samples.length < 2) return 0;
      const first = samples[0];
      const last  = samples[samples.length - 1];
      const dt    = last.t - first.t;
      if (dt < 1) return 0;
      return ((last.x - first.x) / dt) * 1000;
    },
  };
}

// ─── Measure the step between slides from the DOM ─────────────────────────────
function measureStep(trackEl) {
  if (!trackEl) return window.innerWidth;
  const slides = trackEl.children;
  if (slides.length >= 2) {
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }
  return slides[0]?.offsetWidth ?? window.innerWidth;
}

// ─── Maximum velocity passed to the spring ────────────────────────────────────
// Prevents wild overshoot on very fast flicks.
const MAX_VELOCITY = 1200; // px/s

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCarousel({ itemCount, trackRef }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive]         = useState(false);

  const x = useMotionValue(0);

  // Mutable refs — no re-renders needed
  const state           = useRef({ dragging: false, startX: 0, startMotionX: 0 });
  const velocityTracker = useRef(makeVelocityTracker());
  const animControls    = useRef(null);
  const currentIndexRef = useRef(0);   // always-fresh index for gesture callbacks

  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq  = window.matchMedia('(max-width: 768px)');
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onMQ  = (e) => setIsActive(e.matches);
    const onRMQ = (e) => { prefersReduced.current = e.matches; };

    setIsActive(mq.matches);
    prefersReduced.current = rmq.matches;

    mq.addEventListener('change', onMQ);
    rmq.addEventListener('change', onRMQ);
    return () => {
      mq.removeEventListener('change', onMQ);
      rmq.removeEventListener('change', onRMQ);
    };
  }, []);

  // ── Snap to a specific index ───────────────────────────────────────────────
  const snapTo = useCallback((index, velocity = 0) => {
    const el = trackRef.current;
    if (!el) return;

    const step       = measureStep(el);
    const clampedIdx = Math.max(0, Math.min(itemCount - 1, index));
    const target     = -clampedIdx * step;

    setCurrentIndex(clampedIdx);
    currentIndexRef.current = clampedIdx;

    if (prefersReduced.current) {
      x.set(target);
      return;
    }

    if (animControls.current) animControls.current.stop();

    // §4 — bounce only when there's real momentum (a flick)
    const speed  = Math.abs(velocity);
    const bounce = speed > 300 ? 0.15 : 0;

    // Cap velocity so the spring doesn't overshoot wildly
    const cappedV = Math.sign(velocity) * Math.min(speed, MAX_VELOCITY);

    animControls.current = animate(x, target, {
      type: 'spring',
      bounce,
      duration: 0.5,       // slightly longer = smoother settle
      velocity: cappedV,   // §5 — velocity handoff
    });
  }, [itemCount, trackRef, x]);

  // ── Pointer handlers ────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e) => {
    if (!isActive) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    // Remove unconditional setPointerCapture here so the browser can still detect scroll
    // e.currentTarget.setPointerCapture(e.pointerId);

    // §3 — stop any running spring
    if (animControls.current) animControls.current.stop();

    velocityTracker.current.reset();
    velocityTracker.current.record(e.clientX);

    state.current = {
      dragging:     true,
      isScrolling:  false,
      startX:       e.clientX,
      startY:       e.clientY,
      startMotionX: x.get(),   // §3 — read live on-screen value
    };
  }, [isActive, x]);

  const onPointerMove = useCallback((e) => {
    if (!state.current.dragging || state.current.isScrolling) return;

    // Intent detection (give a 5px threshold to decide if they are scrolling up/down or left/right)
    const dx = Math.abs(e.clientX - state.current.startX);
    const dy = Math.abs(e.clientY - state.current.startY);

    if (dx < 5 && dy < 5) return; // Wait for clear movement

    if (dy > dx && dx < 10) {
      // It's a vertical scroll! Abort dragging.
      state.current.isScrolling = true;
      state.current.dragging = false;
      return;
    }

    const el = trackRef.current;
    if (!el) return;

    velocityTracker.current.record(e.clientX);

    const step      = measureStep(el);
    const dimension = step * itemCount;
    const rawDelta  = e.clientX - state.current.startX;
    let newX        = state.current.startMotionX + rawDelta;

    // §9 — rubber-banding at boundaries
    const minX = -(itemCount - 1) * step;
    const maxX = 0;
    if (newX > maxX) {
      newX = rubberband(newX - maxX, dimension);
    } else if (newX < minX) {
      newX = minX + rubberband(newX - minX, dimension);
    }

    x.set(newX);
  }, [itemCount, trackRef, x]);

  const onPointerUp = useCallback(() => {
    if (!state.current.dragging || state.current.isScrolling) {
      state.current.dragging = false;
      state.current.isScrolling = false;
      return;
    }
    state.current.dragging = false;

    const el = trackRef.current;
    if (!el) return;

    const step       = measureStep(el);
    const velocity   = velocityTracker.current.velocity();
    const currentX   = x.get();

    // §6 — project momentum to find where the gesture is heading
    const projectedX     = currentX + project(velocity);
    const projectedIndex = Math.round(-projectedX / step);

    // ── Clamp to ±1 card per swipe ──────────────────────────────────
    const current     = currentIndexRef.current;
    const targetIndex = Math.max(current - 1, Math.min(current + 1, projectedIndex));

    snapTo(targetIndex, velocity);
  }, [snapTo, trackRef, x]);

  const onPointerCancel = useCallback(() => {
    // Browser took over (e.g. for native vertical scroll)
    state.current.dragging = false;
    state.current.isScrolling = false;
    snapTo(currentIndexRef.current, 0); // snap back to current
  }, [snapTo]);

  useEffect(() => {
    const move = (e) => onPointerMove(e);
    const up   = (e) => onPointerUp(e);
    const cancel = (e) => onPointerCancel(e);
    
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup',   up);
    window.addEventListener('pointercancel', cancel);
    
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup',   up);
      window.removeEventListener('pointercancel', cancel);
    };
  }, [onPointerMove, onPointerUp, onPointerCancel]);

  // Re-snap on resize so the track stays aligned
  useEffect(() => {
    const onResize = () => snapTo(currentIndex);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [currentIndex, snapTo]);

  return { currentIndex, x, handlers: { onPointerDown }, isActive, snapTo };
}
