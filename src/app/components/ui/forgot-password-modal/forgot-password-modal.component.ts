import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UiService } from 'app/services/ui.service';

import { IForgotPasswordModal } from 'app/models/forgot-password-modal.model';

@Component({
    selector: 'forgot-password-modal',
    templateUrl: './forgot-password-modal.component.html',
    styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {

    visible = false;
    visibleAnimate = false;
    currentModal: IForgotPasswordModal;

    mail: string;

    modalForm = new FormGroup({
        mail: new FormControl('', Validators.required),
    });

    constructor(
        private _ui: UiService
    ) { }

    ngOnInit() {
        this._ui.getForgotPasswordModal().subscribe(data => {
            this.visible = true;
            this.currentModal = data;
            setTimeout(() => this.visibleAnimate = true, 100);
        });
    }

    cancel() {
        this.visible = false;
        if (this.currentModal.cancel) this.currentModal.cancel();
    }

    confirm() {
        this.visible = false;
        if (this.currentModal.confirm) this.currentModal.confirm(this.mail);
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) this.cancel();
    }
}
