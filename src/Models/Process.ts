import Application from "./Application";

export default interface Process {
    id: number;
    app: Application;
    startTime: Date;
}