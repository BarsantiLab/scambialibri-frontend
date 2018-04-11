import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'book',
    pure: false
})
export class BookPipe implements PipeTransform {
    transform(items, filter: string) {
        if (!items || !filter) {
            return items;
        }

        return items.filter((book) => {
            const regex = new RegExp(filter, 'mi');
            return regex.test(book.author) || regex.test(book.title);
        });
    }
}
