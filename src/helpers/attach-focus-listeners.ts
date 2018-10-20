export function attachFocusListeners (runLoop) {
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            runLoop.stop();
        }
    });
    
    window.addEventListener("blur", function () {
        runLoop.stop();
    });
    
    window.addEventListener("focus", function () {
        // inputs.forEach(input => input.clearState());
        runLoop.start();
    });
}