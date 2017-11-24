import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IBookUnit } from 'app/models/book-unit.model';
import { IBook } from 'app/models/book.model';

@Component({
    selector: 'book-table',
    templateUrl: './book-table.component.html',
    styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {

    @Input() books: IBookUnit[] = [];
    @Input() buttonLabel = '';
    @Input() altButtonLabel = '';
    @Input() lockStatus = false;
    @Output() onButtonClick = new EventEmitter();

    public searchString = '';

    constructor() { }

    ngOnInit() { }

    public buttonClicked(book) {
        this.onButtonClick.emit(book);
    }
}
