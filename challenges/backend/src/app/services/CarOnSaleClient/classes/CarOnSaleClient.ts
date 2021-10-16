import {Auction, ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {inject, injectable} from "inversify";
import "reflect-metadata";

import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ICarOnSaleApi } from "../../CarOnSaleApi/interface/ICarOnSaleApi";

interface RunningAuctionsData {
    items: Auction[],
    total: number
}

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    private runningAuctions : Auction[];

    public constructor(
        @inject(DependencyIdentifier.CAR_ON_SALE_API) private carOnSaleApi: ICarOnSaleApi,
    ) {
        this.runningAuctions = [];
    }

    public async getRunningAuctions(): Promise<Auction[]> {
        try{
            // Verify if the api is already authenticated with the server
            if(!this.carOnSaleApi.isAuthenticated()){
                await this.carOnSaleApi.authenticate();
            }

            // Query the running auctions
            const allRunningAuctionsResponse = await this.carOnSaleApi.get(`/v2/auction/buyer/`);

            const allRunningAuctions : RunningAuctionsData = allRunningAuctionsResponse.data as RunningAuctionsData;

            this.runningAuctions = allRunningAuctions.items;
        }
        catch (e: any) {}

        return this.runningAuctions;
    }

    public calculateAverageAuctionsBidCount(auctions: Auction[]): number {
        return auctions.reduce((acc: number, auction: Auction) => acc += auction.numBids, 0);
    }

    public calculateAuctionProgressPercentage(auction: Auction) : number {
        if(auction.minimumRequiredAsk){
            return +parseFloat(
                String((auction.currentHighestBidValue/auction.minimumRequiredAsk) * 100)
            ).toFixed(2);
        }
        return 0;
    }

    public calculateAverageAuctionsProgressPercentage(auctions: Auction[]) : number {
        const totalProgressPercentage = auctions.reduce(
            (acc: number, auction: Auction) => acc += this.calculateAuctionProgressPercentage(auction)
        , 0);

        return +parseFloat(String(totalProgressPercentage/auctions.length)).toFixed(2);
    }
}