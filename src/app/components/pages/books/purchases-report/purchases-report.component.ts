import { Component, OnInit } from '@angular/core';

import { TransactionService } from 'app/services/api/transaction.service';

@Component({
    selector: 'app-purchases-report',
    templateUrl: './purchases-report.component.html',
    styleUrls: ['./purchases-report.component.scss']
})
export class PurchasesReportComponent implements OnInit {

    transactions: any[] = [];

    constructor(
        private _transaction: TransactionService
    ) { }

    async ngOnInit() {
        this.transactions = await this._transaction.getPurchases();
    }
}
