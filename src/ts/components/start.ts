import { app } from "./app.js";

export class Start {
    initialize(isStart: boolean) {
        if(!isStart) return;
        app.run()
    }
}

export const startApplication = (isStart: boolean) => {
    const starter = new Start();
    starter.initialize(isStart);
}