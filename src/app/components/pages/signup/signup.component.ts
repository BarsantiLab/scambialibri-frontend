import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'app/services/auth.service';
import { UiService } from 'app/services/ui.service';

import { AlertType } from 'app/models/alert.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    // public mail = 'davide.ross93@gmail.com';
    // public password = 'davide12';
    // public repeatPassword = 'davide12';

    mail: string;
    password: string;
    repeatPassword: string;
    privacy: boolean;

    loading = false;

    signupForm = new FormGroup({
        mail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(5)]),
        repeatPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
        privacy: new FormControl(false, [Validators.requiredTrue])
    });

    constructor(
        private _auth: AuthService,
        private _ui: UiService
    ) { }

    ngOnInit() { }

    async signup() {
        // TODO: print error
        if (!this.signupForm.valid || this.password !== this.repeatPassword) return;

        try {
            this.loading = true;
            await this._auth.signup(this.mail, this.password);
            // TODO: provide further instructions
            this._ui.alert(AlertType.Success, 'Iscrizione effettuata con successo!');
        } catch (err) {
            // TODO: creare error handler
            if (err.status === 400) {
                this._ui.alert(AlertType.Warning, 'Indirizzo e-mail già in uso!');
            } else {
                this._ui.alert(AlertType.Error, 'Errore inaspettato!');
            }
        }

        this.loading = false;
    }
}
