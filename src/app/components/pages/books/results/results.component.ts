import { Component, OnInit } from '@angular/core';

import { BookService } from 'app/services/api/book.service';

import { IResult } from 'app/models/result.model';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

    results: IResult[];

    constructor(
        private _book: BookService
    ) { }

    async ngOnInit() {
        this.results = await this._book.getResults();
    }
}
