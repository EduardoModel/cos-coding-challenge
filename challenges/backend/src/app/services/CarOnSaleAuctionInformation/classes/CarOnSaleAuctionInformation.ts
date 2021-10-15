import {ICarOnSaleAuctionInformation} from "../interface/ICarOnSaleAuctionInformation";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class CarOnSaleAuctionInformation implements ICarOnSaleAuctionInformation {

    private runningAuctionsCount : number;
    private averageAuctionBidCount : number;
    private averageAuctionProgressPercentage : number;

    public constructor(info : any) {
        this.runningAuctionsCount = info.runningAuctionsCount;
        this.averageAuctionBidCount = info.averageAuctionBidCount;
        this.averageAuctionProgressPercentage = info.averageAuctionProgressPercentage;
    }
    

    public getRunningAuctionsCount() : number {
        return this.runningAuctionsCount;
    };

    public getAverageAuctionBidCount() : number {
        return this.averageAuctionBidCount;
    }

    getAverageAuctionProgressPercentage() : number {
        return this.averageAuctionProgressPercentage;
    }
}