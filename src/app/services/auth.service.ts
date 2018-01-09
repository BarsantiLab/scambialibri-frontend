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

    async signup(mail, password): Promise<any> {
        const response = await this._http.post(`${this._config.API.url}/v1/user/signup`, {
            mail, password
        });

        return response.json();
    }

    logout() {
        this.clearLocalStorage();
        this.user = null;
        this.token = null;
        this.authenticated = false;
    }

    private clearLocalStorage() {
        localStorage.clear();
    }

    private saveStateToLocalStorage() {
        localStorage.setItem('token', this.token);
        // TODO: save in base64
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    private loadStateFromLocalStorage() {
        const token = localStorage.getItem('token');

        if (token) {
            // TODO: parse in base64
            this.user = JSON.parse(localStorage.getItem('user')) as IUser;

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
