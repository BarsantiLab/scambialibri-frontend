import { Component, OnInit } from '@angular/core';

import { UiService } from 'app/services/ui.service';

import { IConfirmationModal } from 'app/models/confirmation-modal.model';

@Component({
    selector: 'confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

    currentModal: IConfirmationModal;
    visible = false;
    visibleAnimate = false;

    constructor(
        private _ui: UiService
    ) { }

    ngOnInit() {
        this._ui.getModal().subscribe((data) => {
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
        if (this.currentModal.confirm) this.currentModal.confirm();
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) this.cancel();
    }
}
