import { Component, Input, OnInit } from '@angular/core';

import { BookStatus, IBook } from 'app/models/book.model';
import { IGrade } from 'app/models/grade.model';

import { BookService } from 'app/services/api/book.service';
import { OfferService } from 'app/services/api/offer.service';
import { SchoolService } from 'app/services/api/school.service';
import { UserService } from 'app/services/api/user.service';
import { AuthService } from 'app/services/auth.service';
import { OfferType } from '../../../models/offer.model';

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
    @Input() type: OfferType;

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
        private _offer: OfferService
    ) { }

    async ngOnInit() {
        this.grades = await this._school.prepareGradeFilter(await this._user.getUserSchool(this._auth.user.id));
        const userGrade = await this._user.getUserGrade(this._auth.user.id);

        this.filterGrade = this.grades.find(e => e.id === userGrade.id);
        this.onFilterGradeChange();
    }

    async onFilterGradeChange() {
        this.books = await this._book.getBooks(this.type, this.filterGrade);
    }

    public async buttonClicked(book: IBook) {
        if (book.offer.id) {
            await this._offer.cancelOffer(book.offer);
            book.offer = {};
        } else {
            const newOffer = await this._offer.createOffer(
                book, this.type,
                book.offer.additionalMaterial,
                book.offer.bookStatus
            );

            book.offer = newOffer;
        }
    }
}
