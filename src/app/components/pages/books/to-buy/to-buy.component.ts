import { Component, OnInit } from '@angular/core';

import { IBookUnit } from 'app/models/book-unit.model';
import { BookListType, BookService } from 'app/services/api/book.service';

@Component({
    selector: 'app-to-buy',
    templateUrl: './to-buy.component.html',
    styleUrls: ['./to-buy.component.scss']
})
export class ToBuyComponent implements OnInit {

    public books: IBookUnit[];

    constructor(
        private _book: BookService
    ) { }

    async ngOnInit() {
        this.books = await this._book.getBooks(BookListType.future);
    }

    async handleButtonClick(book: IBookUnit) {
        book.toBuy = !book.toBuy;
        await this._book.setBookStatus(book, BookListType.future);
    }
}
