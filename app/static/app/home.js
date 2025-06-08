/**
 * Wakes up all applications by pinging their demo URLs
 */
function wakeUpApplications() {
    // Select all Live Demo buttons using a robust selector
    const demoButtons = document.querySelectorAll('a[name="project_live_url_from_github"]');
    
    demoButtons.forEach(button => {
        const anchor = button.closest('a');
        if (anchor && anchor.href) {
            const url = anchor.href;
            
            fetch(url, {
                mode: 'no-cors',
                cache: 'no-store'
            }).catch(() => {});
            
        }
    });
}

/**
 * Initializes the wake-up functionality
 */
function initWakeUp() {
    // Wake up apps when page loads
    if (document.readyState !== 'loading') {
        wakeUpApplications();
    } else {
        document.addEventListener('DOMContentLoaded', wakeUpApplications);
    }
    
    // Also wake up when tab becomes visible again
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            wakeUpApplications();
        }
    });
}

// Initialize
initWakeUp();