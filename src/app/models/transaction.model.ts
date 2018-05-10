import { BookStatus, IBook } from 'app/models/book.model';
import { IUser } from 'app/models/user.model';

import { BookMode } from 'app/services/api/book.service';

export interface ITransaction {
    id?: string;
    book?: IBook;
    user?: IUser;
    bookStatus: BookStatus;
    additionalMaterial?: boolean;
    status?: TransactionStatus;
}

export enum TransactionStatus {
    free = 'Libera',
    pending = 'In trattativa',
    closed = 'Chiusa'
}
