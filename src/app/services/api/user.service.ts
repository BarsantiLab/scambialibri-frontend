import { Injectable } from '@angular/core';

import { IGrade } from 'app/models/grade.model';
import { ISchool } from 'app/models/school.model';
import { IUser } from 'app/models/user.model';

import { ConfigService } from 'app/services/config.service';
import { HttpService } from 'app/services/http.service';

@Injectable()
export class UserService {
    currentUser: IUser;

    constructor(
        private _config: ConfigService,
        private _http: HttpService
    ) { }

    async getUser(id: string, populate: string[] = []) {
        const url = `${this._config.API.url}/user/${id}?` + populate.map(e => `populate[]=${e}`).join('&');
        const response = await this._http.get(url);

        this.currentUser = await response.json() as IUser;
        return this.currentUser;
    }

    async completeOnboarding(token: string, data: any) {
        const url = `${this._config.API.url}/user/onboarding?token=${token}`;
        const response = await this._http.post(url, data);
        return await response.json();
    }

    async getUserSchool(id: string) {
        const url = `${this._config.API.url}/user/${id}/school`;
        const response = await this._http.get(url);
        return await response.json() as ISchool;
    }

    async getUserGrade(id: string) {
        const url = `${this._config.API.url}/user/${id}/grade`;
        const response = await this._http.get(url);
        return await response.json() as IGrade;
    }

    async recoverPassword(mail: string) {
        const url = `${this._config.API.url}/user/forgot-password`;
        const response = await this._http.post(url, { mail });
        return await response.json();
    }

    async sendNewPassword(token: string, password: string) {
        const url = `${this._config.API.url}/user/set-password`;
        const response = await this._http.post(url, { token, password });
        return await response.json();
    }

    async updateProfile(data: any) {
        const url = `${this._config.API.url}/user`;
        const response = await this._http.post(url, data);
        return await response.json();
    }
}
