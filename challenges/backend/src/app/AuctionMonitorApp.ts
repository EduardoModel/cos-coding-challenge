import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient
    ) {}

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);

        // TODO: Retrieve auctions and display aggregated information (see README.md)
        this.logger.log(`Getting the auction information`);

        const runningAuctions = await this.carOnSaleClient.getRunningAuctions();

        // Verify if the information wasn't retrieved
        if(!runningAuctions.runningAuctionsCount){
            // Exit process with status -1
            process.exit(-1);
        }

        // Log the retrieved data
        this.logger.log(`Number of auctions: ${runningAuctions.runningAuctionsCount}`);
        this.logger.log(`Average bid count on auctions: ${runningAuctions.averageAuctionBidCount}`);
        this.logger.log(`Average percentage of the auction progress: ${runningAuctions.averageAuctionProgressPercentage}`);

        // Exit process with status 0
        process.exit(0);
    }

}
