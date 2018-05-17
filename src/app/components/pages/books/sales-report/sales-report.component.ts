import { Component, OnInit } from '@angular/core';

import { TransactionService } from 'app/services/api/transaction.service';

@Component({
    selector: 'app-sales-report',
    templateUrl: './sales-report.component.html',
    styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

    transactions: any[] = [];

    constructor(
        private _transaction: TransactionService
    ) { }

    async ngOnInit() {
        this.transactions = await this._transaction.getSales();
    }
}
