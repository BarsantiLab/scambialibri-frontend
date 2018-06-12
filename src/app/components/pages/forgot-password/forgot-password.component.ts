import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserService } from 'app/services/api/user.service';
import { UiService } from 'app/services/ui.service';

import { AlertType } from 'app/models/alert.model';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    @ViewChild('passwordForm') passwordForm;

    passwordModel: any = {};
    showError = false;
    token: string;

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService,
        private _ui: UiService,
        private _router: Router
    ) { }

    ngOnInit() {
        this._route.queryParams.subscribe((params: Params) => {
            this.token = params.token;
        });
    }

    async submitNewPassword() {
        this.showError = false;

        if (!this.passwordForm.valid) {
            this.showError = true;
            return;
        }

        const results: any = await this._userService.sendNewPassword(this.token, this.passwordModel.password);

        if (results.status === 'ok') {
            // TODO: change message
            this._ui.alert(AlertType.Success, '<b>Password cambiata con successo!</b><br />Effettua il login per cominciare a vendere i tuoi libri', true);
            this._router.navigate(['/login']);
        }
    }
}
