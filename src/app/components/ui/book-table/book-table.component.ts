import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { BookStatus, IBook } from 'app/models/book.model';
import { IGrade } from 'app/models/grade.model';
import { ITransaction } from 'app/models/transaction.model';

import { BookMode, BookService } from 'app/services/api/book.service';
import { SchoolService } from 'app/services/api/school.service';
import { UserService } from 'app/services/api/user.service';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'book-table',
    templateUrl: './book-table.component.html',
    styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {

    @Input() buttonLabel = '';
    @Input() altButtonLabel = '';
    @Input() lockStatus = false;
    @Input() showStatus = true;
    @Input() mode: BookMode;

    public grades: IGrade[];
    public books: IBook[];

    public searchString = '';
    public filterGrade: IGrade;

    public statuses = BookStatus;

    constructor(
        private _school: SchoolService,
        private _user: UserService,
        private _auth: AuthService,
        private _book: BookService,
    ) { }

    async ngOnInit() {
        // TODO: cache user school/spec/grade
        this.grades = await this._school.prepareGradeFilter(await this._user.getUserSchool(this._auth.user.id));
        const userGrade = await this._user.getUserGrade(this._auth.user.id);

        this.filterGrade = this.grades.find(e => e.id === userGrade.id);
        this.onFilterGradeChange();
    }

    async onFilterGradeChange() {
        this.books = await this._book.getBooks(this.mode, this.filterGrade);
    }

    public async buttonClicked(book: IBook) {
        if (book.transaction.id) {
            await this._book.cancelTransaction(book.transaction);
            book.transaction = {} as ITransaction;
        } else {
            const newTrans = await this._book.createTransaction(
                book, this.mode,
                book.transaction.additionalMaterial,
                book.transaction.bookStatus
            );

            book.transaction = newTrans as ITransaction;
        }
    }
}
