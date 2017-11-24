import { Pipe, PipeTransform } from '@angular/core';
import { IBookUnit } from 'app/models/book-unit.model';

@Pipe({
    name: 'book',
    pure: false
})
export class BookPipe implements PipeTransform {
    transform(items: IBookUnit[], filter: string) {
        if (!items || !filter) {
            return items;
        }

        return items.filter((book: IBookUnit) => {
            const regex = new RegExp(filter, 'mi');
            return regex.test(book.book.author) || regex.test(book.book.title);
        });
    }
}
