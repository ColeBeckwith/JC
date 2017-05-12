import {Component, OnInit, HostListener} from '@angular/core';
import {UpgradesService} from "../upgrades-service/upgrades.service";
import {PlayerStatsService} from "../player-stats-service/player-stats.service";

@Component({
    selector: 'jcx-upgrade-menu',
    templateUrl: './upgrade-menu.component.html',
    styleUrls: ['./upgrade-menu.component.scss']
})
export class UpgradeMenuComponent implements OnInit {

    constructor(public upgradesService: UpgradesService,
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
