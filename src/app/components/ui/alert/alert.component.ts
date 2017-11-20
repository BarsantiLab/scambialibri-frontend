import { Component, OnInit } from '@angular/core';

import { UiService } from '../../../services/ui.service';

import { AlertType, IAlert } from '../../../models/alert.model';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
    alerts: IAlert[] = [];

    constructor(private _ui: UiService) { }

    ngOnInit() {
        this._ui.getAlerts().subscribe((alert: IAlert) => {
            this.alerts.push(alert);

            if (!alert.permanent) {
                setTimeout(() => {
                    this.removeAlert(alert);
                }, 5000);
            }
        });
    }

    removeAlert(alert: IAlert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: IAlert) {
        switch (alert.type) {
            case AlertType.Error: return 'alert-error';
            case AlertType.Warning: return 'alert-warning';
            case AlertType.Success: return 'alert-success';
            default: return '';
        }
    }
}
