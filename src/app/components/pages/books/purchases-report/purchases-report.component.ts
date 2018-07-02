import { Component, OnInit } from '@angular/core';

import { OfferService } from 'app/services/api/offer.service';

@Component({
    selector: 'app-purchases-report',
    templateUrl: './purchases-report.component.html',
    styleUrls: ['./purchases-report.component.scss']
})
export class PurchasesReportComponent implements OnInit {

    transactions: any[] = [];

    constructor(
        private _offerService: OfferService
    ) { }

    async ngOnInit() {
        this.transactions = await this._offerService.getPurchases();
    }
}
