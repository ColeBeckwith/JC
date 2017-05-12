import {Component, OnInit, HostListener} from '@angular/core';
import {PowerupsService} from "../powerups-service/powerups.service";
import {PlayerStatsService} from "../player-stats-service/player-stats.service";

@Component({
    selector: 'jcx-powerup-menu',
    templateUrl: './powerup-menu.component.html',
    styleUrls: ['./powerup-menu.component.scss']
})
export class PowerupMenuComponent implements OnInit {

    constructor(public powerupsService: PowerupsService,
                public playerStats: PlayerStatsService) {
    }

    ngOnInit() {
    }

    @HostListener('mousemove', ['$event'])
    handleMouseMove(event) {
        event.stopPropagation();
    }

    @HostListener('mousedown', ['$event'])
    handleMouseDown(event) {
        event.stopPropagation();
    }

    @HostListener('mouseleave', ['$event'])
    handleMouseLeave(event) {
        event.stopPropagation();
    }

}
