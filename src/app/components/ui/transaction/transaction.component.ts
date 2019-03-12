import { Component, Input, OnInit } from '@angular/core';

import { AlertType } from 'app/models/alert.model';
import { IOffer } from 'app/models/offer.model';
import { ITransaction } from 'app/models/transaction.model';

import { TransactionService } from 'app/services/api/transaction.service';
import { UiService } from 'app/services/ui.service';

@Component({
    selector: 'transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
    // IMPROVE: add date to message
    // TODO: fix TransactionStatus enum problem

    @Input() data: any;

    messageText: string;

    constructor(
        private _transaction: TransactionService,
        private _ui: UiService
    ) { }

    ngOnInit() { }

    async createTransaction(buyerOffer: IOffer, sellerOffer: IOffer) {
        this._ui.showConfirmationModal({
            title: 'Contatta utente',
            question: 'Sei sicuro di contattare questo utente?',
            confirmMessage: 'Sì',
            cancelMessage: 'No',
            confirm: async () => {
                const out = await this._transaction.createTransaction(buyerOffer, sellerOffer);
                this.data.status = 'pending';
                this.data.pairedUser = out.seller;
                this.data.transaction = out.transaction;
                this.data.messages = [];
            }
        });
    }

    async sendMessage() {
        await this._transaction.sendMessage(this.data.transaction as ITransaction, this.messageText);

        this.data.messages.push({
            sent: true,
            content: this.messageText,
            date: new Date()
        });

        // TODO: set status back to pending
        // IMPROVE: show modal if status is not responding

        this.messageText = '';
    }

    async cancelTransaction() {
        this._ui.showConfirmationModal({
            title: 'Annulla transazione',
            question: 'Sei sicuro di voler annullare la transazione?',
            confirmMessage: 'Sì',
            cancelMessage: 'No',
            confirm: async () => {
                const out = await this._transaction.cancelTransaction(this.data.transaction as ITransaction);
                this.data.status = 'free';
                this.data.sales = out.sales;
            }
        });
    }

    async reportNotResponding() {
        this._ui.showConfirmationModal({
            title: 'Utente non risponde',
            question: 'Sei sicuro di voler segnalare che l\'utente non risponde?',
            confirmMessage: 'Sì',
            cancelMessage: 'No',
            confirm: async () => {
                await this._transaction.reportNotResponding(this.data.transaction as ITransaction);
                this.data.status = 'notResponding';
                this._ui.alert(AlertType.Success, 'La transazione è stata segnata come "Non risponde". Se l\'utente non risponderà entro 24h la transazione verrà chiusa automaticamente');
            }
        });
    }

    async completeTransaction() {
        this._ui.showConfirmationModal({
            title: 'Completa transazione',
            question: 'Sei sicuro di voler segnare la transazione come completata?',
            confirmMessage: 'Sì',
            cancelMessage: 'No',
            confirm: async () => {
                const data: any = await this._transaction.reportCompleted(this.data.transaction as ITransaction);

                if (data.isFullyComplete) {
                    this.data.status = 'completed';
                    this._ui.alert(AlertType.Success, 'La transazione è stata completata con successo!');
                } else {
                    this.data.status = 'inCompletion';
                    this.data.transaction.isFirstComplete = true;
                    this._ui.alert(AlertType.Success, 'La transazione è stata segnata come "In completamento". Se l\'utente marcherà la transazione come completata (opppure in 24h) verrà chiusa definitivamente.');
                }
            }
        });
    }
}
