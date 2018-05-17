import { Injectable } from '@angular/core';

import { ConfigService } from 'app/services/config.service';
import { HttpService } from 'app/services/http.service';

import { ITransaction } from '../../models/transaction.model';

@Injectable()
export class TransactionService {
    constructor(
        private _config: ConfigService,
        private _http: HttpService
    ) { }

    async getPurchases() {
        const url = `${this._config.API.url}/transaction/purchases`;
        const response = await this._http.get(url);
        return response.json();
    }

    async getSales() {
        const url = `${this._config.API.url}/transaction/sales`;
        const response = await this._http.get(url);
        return response.json();
    }

    async pairTransaction(trans1: ITransaction, trans2: ITransaction): Promise<void> {
        const url = `${this._config.API.url}/transaction/${trans1.id}/pair`;
        const response = await this._http.post(url, {
            transaction: trans2.id
        });

        return await response.json();
    }

    async sendMessage(transaction: ITransaction, message: string): Promise<void> {
        const url = `${this._config.API.url}/transaction/${transaction.id}/message`;
        const response = await this._http.post(url, { message });

        return await response.json();
    }

    async cancelTransaction(trans: ITransaction): Promise<void> {
        const url = `${this._config.API.url}/transaction/${trans.id}/cancel`;
        const response = await this._http.post(url);

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
