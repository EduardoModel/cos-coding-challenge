/**
 * This service describes an interface to access the data returned by the CarOnSaleClient.
 */
 export interface ICarOnSaleAuctionInformation {

    getRunningAuctionsCount() : number;

    getAverageAuctionBidCount() : number;

    getAverageAuctionProgressPercentage() : number;

}
