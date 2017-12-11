import { Component, OnInit } from '@angular/core';

import { IBookUnit } from 'app/models/book-unit.model';
import { BookListType, BookService } from 'app/services/api/book.service';

@Component({
    selector: 'app-to-sell',
    templateUrl: './to-sell.component.html',
    styleUrls: ['./to-sell.component.scss']
})
export class ToSellComponent implements OnInit {

    public books: IBookUnit[];

    constructor(
        private _book: BookService
    ) { }

    async ngOnInit() {
        this.books = await this._book.getBooks(BookListType.current);
    }

    async handleButtonClick(book: IBookUnit) {
        book.toSell = !book.toSell;
        await this._book.setBookStatus(book, BookListType.current);
    }
}
