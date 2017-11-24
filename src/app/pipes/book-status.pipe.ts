import { Pipe, PipeTransform } from '@angular/core';

import { BookStatus } from 'app/models/book.model';

@Pipe({
    name: 'bookStatus',
    pure: false
})
export class BookStatusPipe implements PipeTransform {
    transform(key) {
        return BookStatus[key] || 'N.D.';
    }
}
