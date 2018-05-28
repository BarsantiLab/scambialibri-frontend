import { Component, Input, OnInit } from '@angular/core';

import { ITransaction, TransactionStatus } from 'app/models/transaction.model';

import { TransactionService } from 'app/services/api/transaction.service';
import { UiService } from 'app/services/ui.service';

@Component({
    selector: 'transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
    // TODO: remove outline to send message button
    // IMPROVE: add date to message
    // TODO: fix TransactionStatus enum problem

    @Input() data: any;

    messageText: string;

    constructor(
        private _transaction: TransactionService,
        private _ui: UiService
    ) { }

    ngOnInit() { }

    async pairTransaction(trans1: ITransaction, trans2: ITransaction) {
        this._ui.showConfirmationModal({
            title: 'Contatta utente',
            question: 'Sei sicuro di contattare questo utente?',
            confirmMessage: 'Sì',
            cancelMessage: 'No',
            confirm: async () => {
                const out = await this._transaction.pairTransaction(trans1, trans2);
                this.data.status = 'pending';
                this.data.pairedUser = out.pairedUser;
                this.data.messages = [];
            }
        });
    }

    async sendMessage() {
        await this._transaction.sendMessage(this.data as ITransaction, this.messageText);

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
                const out = await this._transaction.cancelTransaction(this.data as ITransaction);
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
                await this._transaction.reportNotResponding(this.data as ITransaction);
                this.data.status = 'notResponding';
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
                await this._transaction.reportCompleted(this.data as ITransaction);
                this.data.status = 'inCompletion';
            }
        });
    }
}
