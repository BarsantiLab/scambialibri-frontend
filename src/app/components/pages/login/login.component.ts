import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { UiService } from '../../../services/ui.service';

import { AlertType } from '../../../models/alert.model';
import { IUser } from '../../../models/user.model';

@Component({
    selector: 'login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    // public mail = 'davide.ross93@gmail.com';
    // public password = 'davide12';
    mail: string;
    password: string;
    loading = false;

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
            const user: IUser = await this._auth.login(this.mail, this.password);

            if (user.onboardingCompleted) {
                this._ui.alert(AlertType.Success, 'Login effettuato con successo!');
                this._router.navigate(['/books']);
            } else {
                this._ui.alert(AlertType.Warning,
                    '<b>Non hai completato la procedura di onboarding!</b><br>Verifica la tua casella l\'e-mail di benvenuto!',
                    true
                );
            }
        } catch (err) {
            // TODO: creare error handler
            if (err.status === 401) {
                this._ui.alert(AlertType.Error, 'Credenziali di login errate!', true);
            } else if (err.body.error === 'onboarding_not_completed') {
                this._ui.alert(AlertType.Warning,
                    '<b>Non hai completato la procedura di onboarding!</b><br>Verifica la tua casella l\'e-mail di benvenuto!',
                    true
                );
            } else {
                this._ui.alert(AlertType.Error, 'Errore inaspettato!', true);
            }
        }

        this.loading = false;
    }
}
