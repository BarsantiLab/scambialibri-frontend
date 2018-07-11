import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { TransactionStatus } from 'app/models/transaction.model';

@Pipe({
    name: 'chatDate',
    pure: false
})
export class ChatDatePipe implements PipeTransform {
    transform(date) {
        return moment(date).format('DD/MM/YYYY HH:mm');
    }
}
