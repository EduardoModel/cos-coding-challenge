
import {CarOnSaleClient} from './CarOnSaleClient';
import {expect} from 'chai';

describe('CarOnSaleClient', () => {
    it('should retrieve all the running actions', async () => {
        const carOnSaleClient = new CarOnSaleClient();
        const response = await carOnSaleClient.getRunningAuctions();

        expect(response).to.be.a('number');
    });
});