export interface ILogger {

    log(message: string): void;

    logSpacer(): void;

    exit(status: number): void
}