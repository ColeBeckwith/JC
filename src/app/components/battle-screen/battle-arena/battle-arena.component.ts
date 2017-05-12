import {Component, OnInit, HostBinding, DoCheck, HostListener} from '@angular/core';
import {BattleEngineService} from "../../battle-engine/battle-engine.service";
import {BattleArenaService} from "../../battle-arena-service/battle-arena.service";
import {ProjectilesService} from "../../projectiles-service/projectiles.service";
import {PlayerStatsService} from "../../player-stats-service/player-stats.service";
import {EnemiesService} from "../../enemies-service/enemies.service";

@Component({
    selector: 'jcx-battle-arena',
    templateUrl: './battle-arena.component.html',
    styleUrls: ['./battle-arena.component.scss']
})
export class BattleArenaComponent implements OnInit, DoCheck {
    @HostBinding('style.height.px') public arenaHeight: number;
    @HostBinding('style.width.px') public arenaWidth: number;

    constructor(private battleEngine: BattleEngineService,
                public battleArenaService: BattleArenaService,
                public projectilesService: ProjectilesService,
                private playerStats: PlayerStatsService,
                public enemiesService: EnemiesService) {
    }

    ngOnInit() {
        this.battleEngine.initializeBattle();
        this.battleEngine.startBattle();
    }

    ngDoCheck() {
        if (this.battleArenaService.battleArena) {
            this.arenaWidth = this.battleArenaService.battleArena.width;
            this.arenaHeight = this.battleArenaService.battleArena.height;
        }
    }

    @HostListener('mousedown', ['$event'])
    handleMouseDown(event) {
        this.playerStats.playerPrimaryFiring = true;
    }

    @HostListener('mouseup', ['$event'])
    handleMouseUp(event) {
        this.playerStats.playerPrimaryFiring = false;
    }

    @HostListener('mouseleave', ['$event'])
    handleMouseLeave(event) {
        this.playerStats.playerPrimaryFiring = false;
    }

    @HostListener('mousemove', ['$event'])
    handleMouseMove(event) {
        this.playerStats.playerAimingAtLocation = {
            x: event.offsetX,
            y: this.battleArenaService.battleArena.height - event.offsetY
        }
    }




}
