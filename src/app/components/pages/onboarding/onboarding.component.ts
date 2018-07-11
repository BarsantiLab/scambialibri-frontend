import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlertType } from 'app/models/alert.model';
import { IGrade } from 'app/models/grade.model';
import { ISchool } from 'app/models/school.model';
import { ISpecialization } from 'app/models/specialization.model';

import { SchoolService } from 'app/services/api/school.service';
import { UserService } from 'app/services/api/user.service';
import { UiService } from 'app/services/ui.service';

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

    @ViewChild('onboardingForm') onboardingForm;

    onboardingModel: any = {};

    token: string;
    showError = false;

    school: ISchool;
    specialization: ISpecialization;
    grade: IGrade;

    privacy: boolean;
    terms: boolean;

    schools: ISchool[];
    specializations: ISpecialization[];
    grades: IGrade[];

    showTickError = false;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _schoolService: SchoolService,
        private _userService: UserService,
        private _ui: UiService
    ) { }

    async ngOnInit() {
        this.schools = await this._schoolService.getSchools();

        // TODO: redirect if token does not exists
        this._route.queryParams.subscribe((params: Params) => {
            this.token = params.token;
        });
    }

    async onSelectSchool() {
        if (!this.school) return;

        this.specialization = null;
        this.grade = null;
        this.grades = [];
        this.specializations = await this._schoolService.getSpecializations(this.school);
    }

    async onSelectSpecialization() {
        if (!this.specialization) return;

        this.grade = null;
        this.grades = await this._schoolService.getGrades(this.school, this.specialization);
    }

    async submitOnboarding() {
        this.showError = false;
        this.showTickError = false;

        if (!this.privacy || !this.terms) {
            this.showTickError = true;
            return;
        }

        if (!this.onboardingForm.valid) {
            this.showError = true;
            return;
        }

        this.onboardingModel.school = this.school.id;
        this.onboardingModel.specialization = this.specialization.id;
        this.onboardingModel.grade = this.grade.id;

        const onboardingResults = await this._userService.completeOnboarding(this.token, this.onboardingModel);

        if (onboardingResults.status === 'ok') {
            this._ui.alert(AlertType.Success, '<b>Onboarding completato con successo!</b><br />Effettua il login per cominciare a vendere i tuoi libri', true);
            this._router.navigate(['/login']);
        }

        // TODO: handle errors
    }
}
