import { Injectable } from '@angular/core';

import { BookStatus, IBook } from 'app/models/book.model';
import { IGrade } from 'app/models/grade.model';
import { ITransaction } from 'app/models/transaction.model';

import { ConfigService } from 'app/services/config.service';
import { HttpService } from 'app/services/http.service';

export enum BookMode {
    buy = 'buy',
    sell = 'sell'
}

@Injectable()
export class BookService {
    constructor(
        private _config: ConfigService,
        private _http: HttpService
    ) { }

    async getBooks(mode: BookMode, gradeFilter?: IGrade) {
        let url = `${this._config.API.url}/book?mode=${mode}`;
        if (gradeFilter) url += `&grade=${gradeFilter.id}`;

        const response = await this._http.get(url);
        return await response.json() as IBook[];
    }

    // TODO: move to right service
    async createTransaction(book: IBook, mode: BookMode, additionalMaterial?: boolean, bookStatus?: BookStatus) {
        const url = `${this._config.API.url}/transaction/`;
        const response = await this._http.post(url, {
            book: book.id,
            mode, additionalMaterial, bookStatus
        });

        return await response.json() as ITransaction;
    }

    // TODO: move to right service
    async cancelTransaction(transaction: ITransaction) {
        const url = `${this._config.API.url}/transaction/${transaction.id}`;
        const response = await this._http.delete(url);
        return await response.json();
    }
}
