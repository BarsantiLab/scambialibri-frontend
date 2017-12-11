import { Component, Input, OnInit } from '@angular/core';

import { IResult } from 'app/models/result.model';

@Component({
    selector: 'result-element',
    templateUrl: './result-element.component.html',
    styleUrls: ['./result-element.component.scss']
})
export class ResultElementComponent implements OnInit {

    @Input() result: IResult;

    constructor() { }

    ngOnInit() { }
}
