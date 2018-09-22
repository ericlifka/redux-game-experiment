export default class FpsTracker {
    frameTimes: number[];
    totalTime: number;

    readonly fpsCounterDOM: HTMLDivElement;

    constructor() {
        this.fpsCounterDOM = document.createElement('div');
        this.fpsCounterDOM.classList.add('fps-counter');
        document.body.appendChild(this.fpsCounterDOM);

        this.totalTime = 20 * 100;
        this.frameTimes = [];
        for (let i = 0; i < 100; i++) {
            this.frameTimes.push(20);
        }
    }

    push(ftime: number): void {
        let overflow = this.frameTimes.shift();
        this.totalTime += ftime - overflow;
        this.frameTimes.push(ftime);
    }

    average(): number {
        return this.totalTime / 100;
    }

    updateFPScounter(dtime = this.average()): void {
        let fps = Math.floor(1000 / dtime * 10) / 10;
        this.fpsCounterDOM.innerHTML = pad(`${fps}`);
    }
}

function pad(numString: string): string {
    return numString.length <= 2 ?
        `${numString}.0` :
        numString;
}