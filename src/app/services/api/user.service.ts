import { Injectable } from '@angular/core';

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
        const url = `${this._config.API.url}/${this._config.API.v}/user/${id}?` + populate.map(e => `populate[]=${e}`).join('&');
        const response = await this._http.get(url);

        this.currentUser = await response.json() as IUser;
        return this.currentUser;
    }
}
