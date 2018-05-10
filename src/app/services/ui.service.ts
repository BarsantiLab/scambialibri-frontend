import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AlertType, IAlert } from 'app/models/alert.model';
import { IConfirmationModal } from 'app/models/confirmation-modal.model';

@Injectable()
export class UiService {
    private _alertSubject = new Subject<IAlert>();
    private _confirmationModalSubject = new Subject<IConfirmationModal>();

    constructor() { }

    getAlerts(): Observable<any> {
        return this._alertSubject.asObservable();
    }

    getModal(): Observable<any> {
        return this._confirmationModalSubject.asObservable();
    }

    alert(type: AlertType, message: string, permanent: boolean = false) {
        this._alertSubject.next(<IAlert>{ type, message, permanent });
    }

    showConfirmationModal(config: IConfirmationModal) {
        this._confirmationModalSubject.next(config);
    }
}
