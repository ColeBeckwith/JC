import {Component, OnInit, HostBinding, DoCheck} from '@angular/core';
import {PlayerStatsService} from "../../player-stats-service/player-stats.service";

@Component({
    selector: 'jcx-player-battle-avatar',
    templateUrl: './player-battle-avatar.component.html',
    styleUrls: ['./player-battle-avatar.component.scss']
})
export class PlayerBattleAvatarComponent implements OnInit, DoCheck {
    @HostBinding('style.left.px') xCoordinate: number = 0;
    @HostBinding('style.bottom.px') yCoordinate: number = 0;


    constructor(public playerStats: PlayerStatsService) {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        if (this.playerStats.player.location) {
            this.xCoordinate = this.playerStats.player.location.x;
            this.yCoordinate = this.playerStats.player.location.y;
        }
    }

}
