import { Injectable } from '@angular/core';

import { ConfigService } from 'app/services/config.service';
import { HttpService } from 'app/services/http.service';

import { IOffer } from '../../models/offer.model';
import { ITransaction } from '../../models/transaction.model';

@Injectable()
export class TransactionService {
    constructor(
        private _config: ConfigService,
        private _http: HttpService
    ) { }

    async createTransaction(buyerOffer: IOffer, sellerOffer: IOffer): Promise<any> {
        const url = `${this._config.API.url}/transaction/`;
        const response = await this._http.post(url, {
            buyer: buyerOffer.id,
            seller: sellerOffer.id
        });

        return await response.json();
    }

    async sendMessage(transaction: ITransaction, message: string): Promise<void> {
        const url = `${this._config.API.url}/transaction/${transaction.id}/message`;
        const response = await this._http.post(url, { message });

        return await response.json();
    }

    async cancelTransaction(trans: ITransaction): Promise<any> {
        const url = `${this._config.API.url}/transaction/${trans.id}/`;
        const response = await this._http.delete(url);

        return await response.json();
    }

    async reportNotResponding(trans: ITransaction): Promise<void> {
        const url = `${this._config.API.url}/transaction/${trans.id}/not-responding`;
        const response = await this._http.post(url);

        return await response.json();
    }

    async reportCompleted(trans: ITransaction): Promise<void> {
        const url = `${this._config.API.url}/transaction/${trans.id}/completed`;
        const response = await this._http.post(url);

        return await response.json();
    }
}
