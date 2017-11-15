import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        public _auth: AuthService
    ) { }

    ngOnInit() { }
}
