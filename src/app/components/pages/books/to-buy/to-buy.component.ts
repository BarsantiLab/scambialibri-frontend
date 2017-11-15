import { Component, OnInit } from '@angular/core';

import { IBook } from '../../../../models/book.model';
import { BookService } from '../../../../services/api/book.service';

@Component({
    selector: 'app-to-buy',
    templateUrl: './to-buy.component.html',
    styleUrls: ['./to-buy.component.scss']
})
export class ToBuyComponent implements OnInit {

    public books: IBook[];
    public searchString: string;

    constructor(
        private _book: BookService
    ) { }

    async ngOnInit() {
        this.books = await this._book.getFutureBooks();
        console.log(this.books);
    }
}
