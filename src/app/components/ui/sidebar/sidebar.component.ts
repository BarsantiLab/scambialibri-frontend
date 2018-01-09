import { Component, OnInit } from '@angular/core';

import { UiService } from 'app/services/ui.service';

import { AlertType } from 'app/models/alert.model';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    constructor(
        private _ui: UiService
    ) { }

    ngOnInit() { }
}
