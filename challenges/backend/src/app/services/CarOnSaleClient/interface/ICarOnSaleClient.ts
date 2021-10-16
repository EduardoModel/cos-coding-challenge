export interface Auction {
    id: number,
    numBids: number,
    minimumRequiredAsk: number | null,
    currentHighestBidValue: number
}

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    getRunningAuctions(): Promise<Auction[]>

    calculateAuctionProgressPercentage(auction: Auction) : number

    calculateAverageAuctionsBidCount(auctions: Auction[]): number

    calculateAverageAuctionsProgressPercentage(auctions: Auction[]) : number
}
