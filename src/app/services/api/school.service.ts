import { Injectable } from '@angular/core';

import { IGrade } from 'app/models/grade.model';
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
        const url = `${this._config.API.url}/school`;
        const response = await this._http.get(url);
        return await response.json() as ISchool[];
    }

    async getSpecializations(school: ISchool) {
        const url = `${this._config.API.url}/school/${school.id}/specialization`;
        const response = await this._http.get(url);
        return await response.json() as ISpecialization[];
    }

    async getGrades(school: ISchool, specialization: ISpecialization) {
        const url = `${this._config.API.url}/school/${school.id}/specialization/${specialization.id}/grade`;
        const response = await this._http.get(url);
        return await response.json() as IGrade[];
    }

    async prepareGradeFilter(school: ISchool) {
        const url = `${this._config.API.url}/school/${school.id}/grade/prepare`;
        const response = await this._http.get(url);
        return await response.json() as IGrade[];
    }
}
