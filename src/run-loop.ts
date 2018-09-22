import FpsTracker from "./fps-tracker";

export default class RunLoop {
    fpsTracker: FpsTracker = new FpsTracker();
    active: boolean = false;
    lastFrameTime: number = Date.now();
    boundFrameHandler: (time: number) => void;
    frameCount: number = 0;

    constructor(public callback: (dtime: number) => void) {
        this.boundFrameHandler = this.frameHandler.bind(this);
    }

    frameHandler(time: number): void {
        if (!this.active) return;

        let currentTime = Date.now();
        let dtime = currentTime - this.lastFrameTime;

        this.lastFrameTime = currentTime;
        this.updateFPScounter(dtime);

        try {
            this.callback(dtime);
        } catch (e) {
            console.error('Error running frame: ', e);
        }

        window.requestAnimationFrame(this.boundFrameHandler);
    }

    start(): void {
        if (!this.active) {
            this.active = true;
            window.requestAnimationFrame(this.boundFrameHandler);
        }
    }

    stop(): void {
        this.active = false;
    }

    setCallback(callback: (dtime: number) => void) {
        this.callback = callback;
    }

    updateFPScounter(dtime) {
        this.fpsTracker.push(dtime);

        if (this.frameCount++ > 60) {
            this.fpsTracker.updateFPScounter();
            this.frameCount = 0;
        }
    }
}