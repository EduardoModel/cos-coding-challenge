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
        if(!runningAuctions.length){
            // Exit process with status -1
            this.logger.exit(-1);
        }

        // Log the number of auctions
        this.logger.log(`Number of auctions: ${runningAuctions.length}`);

        this.logger.logSpacer();

        // Log the bid count on every auction
        this.logger.log(`Bid count on each auction`);

        runningAuctions.forEach(auction => {
            this.logger.log(`Auction ID ${auction.id}: ${auction.numBids} bids`);
        });

        this.logger.logSpacer();

        // Log the average auctions bid count
        this.logger.log(`Average auctions bid count: ${this.carOnSaleClient.calculateAverageAuctionsBidCount(runningAuctions)}`);

        this.logger.logSpacer();

        // Log the percentage of each auction progress
        this.logger.log(`Percentage of each auction progress`);
        
        runningAuctions.forEach(auction => {
            this.logger.log(`Auction ID ${auction.id}: ${this.carOnSaleClient.calculateAuctionProgressPercentage(auction)} %`);
        });

        this.logger.logSpacer();

        // Log the average percentage of the auctions progress
        this.logger.log(`Average auctions progress percentage: ${this.carOnSaleClient.calculateAverageAuctionsProgressPercentage(runningAuctions)} %`);

        this.logger.logSpacer();

        // Exit process with status 0
        this.logger.exit(0);
    }

}
