import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {injectable} from "inversify";
import "reflect-metadata";
import api from './../../api';
import { AxiosError, AxiosResponse} from "axios";

interface AuthResponse {
    token: string,
    userId: string
}

interface Auction {
    numBids: number,
    minimumRequiredAsk: number | null,
    currentHighestBidValue: number
}

interface RunningAuctionsData {
    items: Auction[],
    total: number
}

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    public constructor() {
    }

    public async getRunningAuctions(): Promise<any> {
        try{
            // Retrieve an access token
            const encodedUserEmail = encodeURIComponent(process.env.API_USER_EMAIL as string);

            const authenticationResponse : AxiosResponse = await api.put(`/v1/authentication/${encodedUserEmail}`, {
                password: process.env.API_USER_PASSWORD
            });
            const data : AuthResponse = authenticationResponse.data as AuthResponse;

            // Verify if the userId or the token aren't defined inside the response
            if(!data.token || !data.userId){
                throw new Error('Access token is not defined.');
            }

            // Define the token inside the defaults of the request headers
            api.defaults.headers.common['authtoken'] = data.token;
            api.defaults.headers.common['userId'] = data.userId;

            // Query the running auctions for the user
            const allRunningAuctionsResponse = await api.get(`/v2/auction/buyer/`, {
                params: {
                    count: false,
                }
            });

            const allRunningAuctions : RunningAuctionsData = allRunningAuctionsResponse.data as RunningAuctionsData;
            
            // Retrieve the data from the api
            const runningAuctionsCount = allRunningAuctions.total;
            const auctions : Auction[] = allRunningAuctions.items;

            // Calculate the average bids per auction
            const totalBidCount = auctions.reduce((acc: number, auction: Auction) => acc += auction.numBids, 0);
            const averageAuctionBidCount = +parseFloat(String(totalBidCount / runningAuctionsCount)).toFixed(2); // Round up two decimal places
            
            // Calculate the average auction progress
            const averageAuctionProgress = auctions.reduce((acc : number, auction) => {
                // Verify if there is a minimumRequiredAsk for the auction
                if(auction.minimumRequiredAsk){
                    return acc += auction.currentHighestBidValue / auction.minimumRequiredAsk;
                }
                return acc;
            }, 0);

            // Calculate the percentage of the average auction progress
            const averageAuctionProgressPercentage = +parseFloat(String(averageAuctionProgress * 100)).toFixed(2); // Round up two decimal places

            // Save all the results inside an object
            const results = {
                runningAuctionsCount,
                averageAuctionBidCount,
                averageAuctionProgressPercentage
            };

            // Return the encapsulated information
            return results;
        }
        catch (e: AxiosError | any) {
            // Return an empty object
            return {};
        }
    }
}