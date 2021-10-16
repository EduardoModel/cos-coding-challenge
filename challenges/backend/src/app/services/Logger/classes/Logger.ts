import {ILogger} from "../interface/ILogger";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class Logger implements ILogger {

    public constructor() {
    }


    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }

    public logSpacer(): void {
        console.log('\n--------------------------------------\n');
    }

    public exit(status: number): void {
        this.log(`Exiting with the status ${status}`);
        process.exit(status);
    }

}