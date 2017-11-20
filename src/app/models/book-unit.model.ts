import { IBook } from './book.model';

export interface IBookUnit {
    book: IBook,

    toSell?: boolean,
    toBuy?: boolean,

    status?: BookStatus,
    additionalMaterial?: boolean
}

export enum BookStatus {
    new, pencilNotes, penNotes, badConditions
}
