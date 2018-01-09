import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlertType } from 'app/models/alert.model';
import { IClass } from 'app/models/class.model';
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

    onboardingModel: any = {
        firstName: 'Davide',
        lastName: 'Rossetto',
        phone: '3483258988',
        address: 'Via Spellatteria Alta 24/B',
        city: 'Trebaseleghe',
        zipCode: '35010',
        province: 'PD'
    };

    token: string;
    showError = false;

    school: ISchool;
    specialization: ISpecialization;
    class: IClass;

    schools: ISchool[];
    specializations: ISpecialization[];
    classes: IClass[];

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
        this.class = null;
        this.classes = [];
        this.specializations = await this._schoolService.getSpecializations(this.school);
    }

    async onSelectSpecialization() {
        if (!this.specialization) return;

        this.class = null;
        this.classes = await this._schoolService.getClasses(this.school, this.specialization);
    }

    async submitOnboarding() {
        this.showError = false;

        if (!this.onboardingForm.valid) {
            this.showError = true;
            return;
        }

        this.onboardingModel.school = this.school.id;
        this.onboardingModel.specialization = this.specialization.id;
        this.onboardingModel.class = this.class.id;

        const onboardingResults = await this._userService.completeOnboarding(this.token, this.onboardingModel);

        if (onboardingResults.status === 'ok') {
            this._ui.alert(AlertType.Success, '<b>Onboarding completato con successo!</b><br />Effettua il login per cominciare a vendere i tuoi libri', true);
            // TODO: uncomment in production
            // this._router.navigate(['/login']);
        }

        // TODO: handle errors
    }
}