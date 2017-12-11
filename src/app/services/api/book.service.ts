import { Injectable } from '@angular/core';

import { IBookUnit } from 'app/models/book-unit.model';
import { IBook } from 'app/models/book.model';

import { ConfigService } from 'app/services/config.service';
import { HttpService } from 'app/services/http.service';

export enum BookListType {
    current = 'current',
    future = 'future'
}

@Injectable()
export class BookService {
    constructor(
        private _config: ConfigService,
        private _http: HttpService
    ) { }

    async getBooks(listType: BookListType) {
        const url = `${this._config.API.url}/${this._config.API.v}/book/${listType}`;
        const response = await this._http.get(url);
        return await response.json() as IBookUnit[];
    }

    async setBookStatus(book: IBookUnit, listType: BookListType) {
        const url = `${this._config.API.url}/${this._config.API.v}/book/${listType}/${book.book.id}/status`;
        const response = await this._http.post(url, {
            toSell: book.toSell,
            toBuy: book.toBuy,
            status: book.status,
            additionalMaterial: book.additionalMaterial
        });
    }
}
