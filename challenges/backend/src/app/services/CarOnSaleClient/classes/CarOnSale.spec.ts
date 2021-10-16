import 'dotenv/config';
import {CarOnSaleClient} from './CarOnSaleClient';
import {expect} from 'chai';
import { CarOnSaleApi } from '../../CarOnSaleApi/classes/CarOnSaleApi';

describe('CarOnSaleClient', () => {
    it('should query the information of all the running actions and contain the right data', async () => {
        const carOnSaleClient = new CarOnSaleClient(new CarOnSaleApi());
        const runningAuctions = await carOnSaleClient.getRunningAuctions();

        expect(runningAuctions)
            .to.be.a('array');

        if(runningAuctions.length){
            const auction = runningAuctions[0];
        
            expect(auction)
                .to.haveOwnProperty('id')
                .and.to.be.a('number');

            expect(auction)
                .to.haveOwnProperty('numBids')
                .and.to.be.a('number');

            expect(auction)
                .to.haveOwnProperty('minimumRequiredAsk')
                .and.to.satisfy((value: any) => {
                    return typeof value === 'number' || value === null
                });
            
            expect(auction)
                .to.haveOwnProperty('currentHighestBidValue')
                .and.to.be.a('number');
    
            expect(carOnSaleClient.calculateAuctionProgressPercentage(auction))
                .to.be.a('number')
        }
    });

    it('should be able to calculate the average bid count for the auctions', async () => {
        const carOnSaleClient = new CarOnSaleClient(new CarOnSaleApi());
        const runningAuctions = await carOnSaleClient.getRunningAuctions();

        expect(runningAuctions)
            .to.be.a('array');

        if(runningAuctions.length){
            expect(carOnSaleClient.calculateAverageAuctionsBidCount(runningAuctions)).to.be.a('number');
        }
    });

    it('should be able to calculate the average progress percentage the auctions', async () => {
        const carOnSaleClient = new CarOnSaleClient(new CarOnSaleApi());
        const runningAuctions = await carOnSaleClient.getRunningAuctions();

        expect(runningAuctions)
            .to.be.a('array');

        if(runningAuctions.length){
            expect(carOnSaleClient.calculateAverageAuctionsProgressPercentage(runningAuctions)).to.be.a('number');
        }
    });
});