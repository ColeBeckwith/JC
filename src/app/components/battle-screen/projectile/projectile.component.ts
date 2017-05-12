import {Component, OnInit, Input, HostBinding, DoCheck} from '@angular/core';
import {Projectile} from "../../../interfaces/Projectile";

@Component({
    selector: 'jcx-projectile',
    templateUrl: './projectile.component.html',
    styleUrls: ['./projectile.component.scss']
})
export class ProjectileComponent implements OnInit, DoCheck {
    @Input('projectile') projectile: Projectile;

    @HostBinding('style.left.px') xCoordinate: number = 0;
    @HostBinding('style.bottom.px') yCoordinate: number = 0;

    constructor() {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        if (this.projectile) {
            this.xCoordinate = this.projectile.location.x;
            this.yCoordinate = this.projectile.location.y;
        }
    }
}
