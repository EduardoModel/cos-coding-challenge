
import {CarOnSaleClient} from './CarOnSaleClient';
import {expect} from 'chai';
import { CarOnSaleApi } from '../../CarOnSaleApi/classes/CarOnSaleApi';

describe('CarOnSaleClient', () => {
    it('should the information of all the running actions', async () => {
        const carOnSaleClient = new CarOnSaleClient(new CarOnSaleApi());
        const response = await carOnSaleClient.getRunningAuctions();

        expect(response).to.be.a('object');
    });
});