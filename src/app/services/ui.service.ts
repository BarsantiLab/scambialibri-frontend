import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AlertType, IAlert } from '../models/alert.model';

@Injectable()
export class UiService {
    private subject = new Subject<IAlert>();

    constructor() { }

    getAlerts(): Observable<any> {
        return this.subject.asObservable();
    }

    alert(type: AlertType, message: string, permanent: boolean = false) {
        this.subject.next(<IAlert>{ type, message, permanent });
    }
}
