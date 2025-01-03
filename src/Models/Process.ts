export default class Process {
    id: number;
    name: string;
    status: 'running' | 'stopped' | 'paused';
    startTime: Date;
    endTime?: Date;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.status = 'stopped';
        this.startTime = new Date();
    }

    start() {
        this.status = 'running';
        this.startTime = new Date();
    }

    stop() {
        this.status = 'stopped';
        this.endTime = new Date();
    }

    pause() {
        this.status = 'paused';
    }

    resume() {
        if (this.status === 'paused') {
            this.status = 'running';
        }
    }
}