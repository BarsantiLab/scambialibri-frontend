import { IOffer } from 'app/models/offer.model';

export interface IBook {
    id: number;
    isbn: string;
    title: string;
    subtitle: string;
    price: number;
    author: string;

    offer?: IOffer;
}

export enum BookStatus {
    new = 'Nuovo',
    pencilNotes = 'Note a matita',
    penNotes = 'Note a penna',
    badConditions = 'Cattive condizioni'
}
