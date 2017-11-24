import { Injectable } from '@angular/core';

import { IBookUnit } from '../../models/book-unit.model';
import { IBook } from '../../models/book.model';

import { ConfigService } from '../../services/config.service';
import { HttpService } from '../../services/http.service';

@Injectable()
export class BookService {
    currentBooks: IBookUnit[];
    futureBooks: IBookUnit[];

    constructor(
        private _config: ConfigService,
        private _http: HttpService
    ) { }

    async getFutureBooks() {
        const url = `${this._config.API.url}/${this._config.API.v}/book/future`;
        const response = await this._http.get(url);

        this.futureBooks = await response.json() as IBookUnit[];
        return this.futureBooks;
    }

    async getCurrentBooks() {
        const url = `${this._config.API.url}/${this._config.API.v}/book/current`;
        const response = await this._http.get(url);

        this.currentBooks = await response.json() as IBookUnit[];
        return this.currentBooks;
    }

    async setBookStatus(book: IBookUnit) {
        const url = `${this._config.API.url}/${this._config.API.v}/book/${book.book.id}/status`;
        const response = await this._http.post(url, {
            toSell: book.toSell,
            toBuy: book.toBuy,
            status: book.status,
            additionalMaterial: book.additionalMaterial
        });
    }
}
