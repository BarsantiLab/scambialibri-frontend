import { Component, OnInit } from '@angular/core';

import { UiService } from 'app/services/ui.service';

import { IConfirmationModal } from 'app/models/confirmation-modal.model';

@Component({
    selector: 'confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

    showModal = false;
    currentModal: IConfirmationModal;

    constructor(
        private _ui: UiService
    ) { }

    ngOnInit() {
        this._ui.getModal().subscribe((data) => {
            this.showModal = true;
            this.currentModal = data;
        });
    }

    cancel() {
        this.showModal = false;
        if (this.currentModal.cancel) this.currentModal.cancel();
    }

    confirm() {
        this.showModal = false;
        if (this.currentModal.confirm) this.currentModal.confirm();
    }
}
