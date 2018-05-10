import { Pipe, PipeTransform } from '@angular/core';

import { TransactionStatus } from 'app/models/transaction.model';

@Pipe({
    name: 'transactionStatus',
    pure: false
})
export class TransactionStatusPipe implements PipeTransform {
    transform(key) {
        return TransactionStatus[key] || 'N.D.';
    }
}
