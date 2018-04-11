import { BookStatus, IBook } from 'app/models/book.model';
import { IUser } from 'app/models/user.model';

import { BookMode } from 'app/services/api/book.service';

export interface ITransaction {
    id?: string;
    book?: IBook;
    user?: IUser;
    mode: BookMode;
    bookStatus: BookStatus;
    additionalMaterial?: boolean;
}
