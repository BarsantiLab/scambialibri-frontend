import { BookStatus } from './book-unit.model';
import { IBook } from './book.model';

export interface IResult {
    book: IBook;
    users: [{
        firstName: string;
        lastName: string;
        address: string;
        status: BookStatus;
        additionalMaterial: boolean;
    }];
}
