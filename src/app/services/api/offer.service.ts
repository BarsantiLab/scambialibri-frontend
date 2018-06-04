import { Injectable } from '@angular/core';

import { ConfigService } from 'app/services/config.service';
import { HttpService } from 'app/services/http.service';

import { BookStatus, IBook } from 'app/models/book.model';
import { OfferType } from 'app/models/offer.model';

@Injectable()
export class OfferService {
    constructor(
        private _config: ConfigService,
        private _http: HttpService
    ) { }

    async createOffer(book: IBook, type: OfferType, additionalMaterial?: boolean, bookStatus?: BookStatus) {
        const url = `${this._config.API.url}/offer/`;
        const response = await this._http.post(url, {
            book: book.id,
            type,
            additionalMaterial,
            bookStatus
        });

        // TODO: convert to IOffer
        return await response.json() as any;
    }
}
