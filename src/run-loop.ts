
export default class RunLoop {

    readonly callback: (deltaT: number) => void;
    private halt: boolean;
    private lastTime: number;

    public constructor(callback: (deltaT: number) => void) {
        this.callback = callback;
    }

    public start(): void {
        this.halt = false;
        this.loop();
    }

    public stop(): void {
        this.halt = true;
    }

    private loop(): void {
        if (this.halt) {
            return;
        }

        window.requestAnimationFrame((time: number): void => {
            let deltaT = time - this.lastTime;
            this.lastTime = time;

            try {
                this.callback(deltaT);
            }
            catch (e) {
                console.error("Error in frame:", e);
            }

            this.loop();
        });
    }
}