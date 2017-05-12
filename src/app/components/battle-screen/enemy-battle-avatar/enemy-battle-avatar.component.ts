import {Component, OnInit, Input, HostBinding} from '@angular/core';
import {Enemy} from "../../../interfaces/Enemy";

@Component({
    selector: 'jcx-enemy-battle-avatar',
    templateUrl: './enemy-battle-avatar.component.html',
    styleUrls: ['./enemy-battle-avatar.component.scss']
})
export class EnemyBattleAvatarComponent implements OnInit {
    @Input('enemy') enemy: Enemy;

    @HostBinding('style.left.px') xCoordinate: number = 0;
    @HostBinding('style.bottom.px') yCoordinate: number = 0;

    constructor() {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        if (this.enemy) {
            this.xCoordinate = this.enemy.location.x;
            this.yCoordinate = this.enemy.location.y;
        }
    }

}
