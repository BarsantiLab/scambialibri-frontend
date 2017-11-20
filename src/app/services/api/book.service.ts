import { Injectable } from '@angular/core';

import { IBook } from '../../models/book.model';
import { IBookUnit } from '../../models/book-unit.model';

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
}
