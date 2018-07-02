import { Component, OnInit } from '@angular/core';

import { OfferService } from 'app/services/api/offer.service';

@Component({
    selector: 'app-sales-report',
    templateUrl: './sales-report.component.html',
    styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

    transactions: any[] = [];

    constructor(
        private _offerService: OfferService
    ) { }

    async ngOnInit() {
        this.transactions = await this._offerService.getSales();
    }
}
