import { BookStatus, IBook } from 'app/models/book.model';

export enum OfferType {
    buy,
    sell
}

export interface IOffer {
    id?: string;
    book?: IBook;
    isPending?: boolean;
    bookStatus?: BookStatus;
    additionalMaterial?: boolean;
}
