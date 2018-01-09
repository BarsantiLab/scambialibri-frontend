import { Injectable } from '@angular/core';

import { IClass } from 'app/models/class.model';
import { ISchool } from 'app/models/school.model';
import { ISpecialization } from 'app/models/specialization.model';

import { ConfigService } from 'app/services/config.service';
import { HttpService } from 'app/services/http.service';

@Injectable()
export class SchoolService {
    constructor(
        private _config: ConfigService,
        private _http: HttpService
    ) { }

    async getSchools() {
        const url = `${this._config.API.url}/${this._config.API.v}/school`;
        const response = await this._http.get(url);
        return await response.json() as ISchool[];
    }

    async getSpecializations(school: ISchool) {
        const url = `${this._config.API.url}/${this._config.API.v}/school/${school.id}/specialization`;
        const response = await this._http.get(url);
        return await response.json() as ISpecialization[];
    }

    async getClasses(school: ISchool, specialization: ISpecialization) {
        console.log(school);

        const url = `${this._config.API.url}/${this._config.API.v}/school/${school.id}/specialization/${specialization.id}/class`;

        const response = await this._http.get(url);
        return await response.json() as IClass[];
    }
}
