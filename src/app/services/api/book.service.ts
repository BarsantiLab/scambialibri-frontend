import { Injectable } from '@angular/core';

import { BookStatus, IBook } from 'app/models/book.model';
import { IGrade } from 'app/models/grade.model';
import { ITransaction } from 'app/models/transaction.model';

import { ConfigService } from 'app/services/config.service';
import { HttpService } from 'app/services/http.service';
import { OfferType } from '../../models/offer.model';

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

    async getBooks(type: OfferType, gradeFilter?: IGrade) {
        let url = `${this._config.API.url}/book?type=${type}`;
        if (gradeFilter) url += `&grade=${gradeFilter.id}`;

        const response = await this._http.get(url);
        return await response.json() as IBook[];
    }
}
