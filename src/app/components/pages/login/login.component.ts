import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { UiService } from '../../../services/ui.service';

import { AlertType } from '../../../models/alert.model';

@Component({
    selector: 'login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public mail = 'davide.ross93@gmail.com';
    public password = 'davide12';
    public loading  = false;

    loginForm = new FormGroup({
        mail: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _ui: UiService
    ) { }

    async login(): Promise<any> {
        if (!this.loginForm.valid) {
            return;
        }

        try {
            this.loading = true;
            await this._auth.login(this.mail, this.password);

            this._ui.alert(AlertType.Success, 'Login effettuato con successo!');
            this._router.navigate(['/books']);
        } catch (err) {
            if (err.status === 401) {
                this._ui.alert(AlertType.Error, 'Credenziali di login errate!', true);
            } else {
                this._ui.alert(AlertType.Error, 'Errore inaspettato!', true);
            }
        }

        this.loading = false;
    }
}