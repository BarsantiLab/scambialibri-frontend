import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AlertType, IAlert } from 'app/models/alert.model';
import { IConfirmationModal } from 'app/models/confirmation-modal.model';
import { IForgotPasswordModal } from 'app/models/forgot-password-modal.model';

@Injectable()
export class UiService {
    private _alertSubject = new Subject<IAlert>();
    private _confirmationModalSubject = new Subject<IConfirmationModal>();
    private _forgotPasswordModalSubject = new Subject<IForgotPasswordModal>();

    constructor() { }

    getAlerts(): Observable<any> {
        return this._alertSubject.asObservable();
    }

    getConfirmationModal(): Observable<any> {
        return this._confirmationModalSubject.asObservable();
    }

    getForgotPasswordModal(): Observable<any> {
        return this._forgotPasswordModalSubject.asObservable();
    }

    alert(type: AlertType, message: string, permanent: boolean = false) {
        this._alertSubject.next(<IAlert>{ type, message, permanent });
    }

    showConfirmationModal(config: IConfirmationModal) {
        this._confirmationModalSubject.next(config);
    }

    showForgotPasswordModal(config: IForgotPasswordModal) {
        this._forgotPasswordModalSubject.next(config);
    }
}
