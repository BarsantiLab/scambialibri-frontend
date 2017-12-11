import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'app/services/api/user.service';
import { AuthService } from 'app/services/auth.service';

import { IUser } from 'app/models/user.model';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    user: IUser = {} as IUser;

    constructor(
        public _auth: AuthService,
        public _user: UserService,
        public _router: Router
    ) { }

    async ngOnInit() {
        this.user = await this._user.getUser(this._auth.user.id, ['currentClass', 'futureClass']);
        // TODO: add current and future class (to be fixed in backend)
    }

    logout() {
        this._auth.logout();
        this._router.navigate(['/login']);
    }
}
