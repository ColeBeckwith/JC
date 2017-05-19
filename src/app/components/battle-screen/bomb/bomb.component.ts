import {Component, OnInit, Input, HostBinding, DoCheck} from '@angular/core';
import {Bomb} from "../../../interfaces/Bomb";

@Component({
    selector: 'jcx-bomb',
    templateUrl: './bomb.component.html',
    styleUrls: ['./bomb.component.scss']
})
export class BombComponent implements OnInit, DoCheck {
    @Input('bomb') bomb: Bomb;

    @HostBinding('style.left.px') xCoordinate: number;
    @HostBinding('style.bottom.px') yCoordinate: number;

    constructor() {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        if (this.bomb) {
            this.xCoordinate = this.bomb.origin.x;
            this.yCoordinate = this.bomb.origin.y;
        }
    }

}
