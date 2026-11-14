import { useEffect, useState, useRef } from "react";
import { animate } from "framer-motion";
import "./AnimatedNumber.css";

const AnimatedNumber = ({ value, formatter = Math.floor, duration = 2, delay = 0 }) => {
  const nodeRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    // We animate from 0 to the target value
    const controls = animate(0, value, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate(curValue) {
        node.textContent = formatter(curValue);
      },
    });

    return () => controls.stop();
  }, [value, isInView, duration, delay, formatter]);

  return <span ref={nodeRef} className="animated-number">0</span>;
};

export default AnimatedNumber;
