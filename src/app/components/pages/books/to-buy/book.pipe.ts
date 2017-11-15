import { Pipe, PipeTransform } from '@angular/core';
import { IBook } from '../../../../models/book.model';

@Pipe({
    name: 'book',
    pure: false
})
export class BookPipe implements PipeTransform {
    transform(items: IBook[], filter: string) {
        if (!items || !filter) {
            return items;
        }

        return items.filter((book: IBook) => {
            // TODO: refactor with regex
            return (
                book.book.author.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                book.book.title.toLowerCase().indexOf(filter.toLowerCase()) > -1
            );
        });
    }
}
