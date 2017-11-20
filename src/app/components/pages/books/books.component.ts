import { Component, OnInit } from '@angular/core';

import { UiService } from 'app/services/ui.service';

import { AlertType } from 'app/models/alert.model';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
    public AlertType = AlertType;
    inc = 0;

    constructor(public _ui: UiService) { }

    ngOnInit() { }

    addAlert(type: AlertType, message: string) {
        this._ui.alert(this.inc % 4, message + ' ' + this.inc++, this.inc % 2 === 0);
    }
}
