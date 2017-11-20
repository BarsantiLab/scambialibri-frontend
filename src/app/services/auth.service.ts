import { Injectable, OnInit } from '@angular/core';

import { ConfigService } from './config.service';
import { HttpService } from './http.service';

import { IUser } from '../models/user.model';

@Injectable()
export class AuthService {
    public user: IUser;
    public authenticated: boolean;
    public token: string;

    constructor(private _http: HttpService, private _config: ConfigService) {
        this.loadStateFromLocalStorage();
    }

    clearToken() {
        this.clearLocalStorage();
        this.loadStateFromLocalStorage();
    }

    async login(mail, password): Promise<any> {
        this.clearToken();

        const response = await this._http.post(`${this._config.API.url}/v1/user/login`, {
            mail,
            password
        });

        this.user = response.json() as IUser;
        this.token = this.user.accessToken;

        this.saveStateToLocalStorage();
        this.loadStateFromLocalStorage();
    }

    private clearLocalStorage() {
        localStorage.clear();
    }

    private saveStateToLocalStorage() {
        localStorage.setItem('token', this.token);
        localStorage.setItem('id', this.user.id);
        localStorage.setItem('mail', this.user.mail);
    }

    private loadStateFromLocalStorage() {
        const token = localStorage.getItem('token');

        if (token) {
            this.user = {
                id: localStorage.getItem('id'),
                accessToken: localStorage.getItem('token'),
                mail: localStorage.getItem('mail')
            };

            this.token = localStorage.getItem('token');
            this.authenticated = true;

            this._http.setDefaultHeaders({
                'Authorization': `bearer ${this.token}`
            });
        } else {
            this.user = null;
            this.authenticated = false;
            this.token = null;
        }
    }
}
