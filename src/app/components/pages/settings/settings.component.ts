import { Component, OnInit, ViewChild } from '@angular/core';

import { IGrade } from 'app/models/grade.model';
import { ISchool } from 'app/models/school.model';
import { ISpecialization } from 'app/models/specialization.model';

import { AlertType } from 'app/models/alert.model';
import { SchoolService } from 'app/services/api/school.service';
import { UserService } from 'app/services/api/user.service';
import { AuthService } from 'app/services/auth.service';
import { UiService } from 'app/services/ui.service';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    @ViewChild('settingsForm') settingsForm;

    settingsModel: any = {};

    public user: any;
    public schools: ISchool[];
    public specs: ISpecialization[];
    public grades: IGrade[];

    constructor(
        private _user: UserService,
        private _auth: AuthService,
        private _schoolService: SchoolService,
        private _ui: UiService
    ) { }

    async ngOnInit() {
        // TODO: use populate instead of multiple calls and find
        // TODO: change specializations based on changed school
        // TODO: change grades based on changed specializations
        this.user = await this._user.getUser(this._auth.user.id);
        this.settingsModel = { ...this.user };

        this.schools = await this._schoolService.getSchools();
        this.settingsModel.school =  this.schools.find(e => e.id === this.user.school);

        this.specs = await this._schoolService.getSpecializations(this.settingsModel.school);
        this.settingsModel.specialization = this.specs.find(e => e.id === this.user.specialization);

        this.grades = await this._schoolService.getGrades(
            this.settingsModel.school,
            this.settingsModel.specialization,
            ['specialization']
        );

        this.settingsModel.currentGrade = this.grades.find(e => e.id === this.user.currentGrade);
        this.settingsModel.futureGrade = this.grades.find(e => e.id === this.user.futureGrade);
    }

    async submitProfile() {
        // TODO: handle validation

        const profileResult = await this._user.updateProfile(this.settingsModel);

        if (profileResult.status === 'ok') {
            this._ui.alert(AlertType.Success, 'Profilo aggiornato con successo!', true);
        }

        // TODO: handle errors
    }
}
