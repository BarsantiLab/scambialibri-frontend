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
    // TODO: add date

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
                this.data.status = TransactionStatus.pending;
            }
        });

        // TODO: fix not changing status (maybe)
    }

    async sendMessage() {
        await this._transaction.sendMessage(this.data as ITransaction, this.messageText);

        this.data.messages.push({
            sent: true,
            content: this.messageText,
            date: new Date()
        });

        this.messageText = '';
    }

    async cancelTransaction() {
        this._ui.showConfirmationModal({
            title: 'Annulla transazione',
            question: 'Sei sicuro di voler annullare la transazione?',
            confirmMessage: 'Sì',
            cancelMessage: 'No',
            confirm: async () => {
                await this._transaction.cancelTransaction(this.data as ITransaction);
                this.data.status = TransactionStatus.free;
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
                // TODO: add alert message
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
                // TODO: complete method
            }
        });
    }
}
