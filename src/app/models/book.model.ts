export interface IBook {
    id: number;
    isbn: string;
    title: string;
    subtitle: string;
    price: number;
    author: string;
}

export enum BookStatus {
    new = 'Nuovo',
    pencilNotes = 'Note a matita',
    penNotes = 'Note a penna',
    badConditions = 'Cattive condizioni'
}
