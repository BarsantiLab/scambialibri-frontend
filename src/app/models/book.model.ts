import { ITransaction } from 'app/models/transaction.model';

export interface IBook {
    id: number;
    isbn: string;
    title: string;
    subtitle: string;
    price: number;
    author: string;

    transaction?: ITransaction;
}

export enum BookStatus {
    new = 'Nuovo',
    pencilNotes = 'Note a matita',
    penNotes = 'Note a penna',
    badConditions = 'Cattive condizioni'
}
