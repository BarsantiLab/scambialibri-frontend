import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import * as octicons from 'octicons';

@Directive({
    selector: '[octicon]'
})
export class OcticonDirective implements OnInit {
    @Input() octicon: string;
    @Input('octicon-width') width: number;

    constructor(
        private _ref: ElementRef,
        private _renderer: Renderer2
    ) { }

    ngOnInit(): void {
        const el: HTMLElement = this._ref.nativeElement;
        el.innerHTML = octicons[this.octicon].toSVG();

        const icon: Node = el.firstChild;

        if (this.width) {
            this._renderer.setStyle(icon, 'width', this.width);
            this._renderer.setStyle(icon, 'height', this.width);
        }
    }
}
