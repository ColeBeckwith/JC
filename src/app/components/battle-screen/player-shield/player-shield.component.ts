import {Component, OnInit, HostBinding} from '@angular/core';
import {Shield} from "../../../interfaces/Shield";
import {PlayerStatsService} from "../../player-stats-service/player-stats.service";

@Component({
    selector: 'jcx-player-shield',
    templateUrl: './player-shield.component.html',
    styleUrls: ['./player-shield.component.scss']
})
export class PlayerShieldComponent implements OnInit {
    shield: Shield;

    @HostBinding('style.border-width.px') shieldStrength: number;

    constructor(private playerStats: PlayerStatsService) {
    }

    ngOnInit() {
        this.shield = this.playerStats.player.shield;
    }

    ngDoCheck() {
        if (this.shield) {
            this.shieldStrength = (this.shield.durability / this.shield.maxDurability) * 5;
        }
    }

}
