import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {PlayerStatsService} from "../player-stats-service/player-stats.service";
import {GameStateService} from "../game-state-service/game-state.service";
import {BattleEngineService} from "../battle-engine/battle-engine.service";
// import {HotkeysService, Hotkey} from "angular2-hotkeys";

@Component({
    selector: 'jcx-battle-screen',
    templateUrl: 'battle-screen.component.html',
    styleUrls: ['battle-screen.component.scss']
})
export class BattleScreenComponent implements OnInit, OnDestroy {

    constructor(private playerStats: PlayerStatsService,
                private battleEngine: BattleEngineService) {
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event) {
        switch (event.code) {
            case 'ArrowRight':
            case 'KeyD':
                this.playerStats.setXAccelerationToMax();
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.playerStats.setXAccelerationToMin();
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.playerStats.setYAccelerationToMin();
                break;
            case 'ArrowUp':
            case 'KeyW':
                this.playerStats.setYAccelerationToMax();
                break;
            case 'Space':
                this.battleEngine.toggleBankCountdown();
            default:
                break;
        }
    }

    @HostListener('window:keyup', ['$event'])
    handleKeyUp(event) {
        switch (event.code) {
            case 'ArrowRight':
            case 'KeyD':
                this.playerStats.stopPositiveXAcceleration();
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.playerStats.stopNegativeXAcceleration();
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.playerStats.stopNegativeYAcceleration();
                break;
            case 'ArrowUp':
            case 'KeyW':
                this.playerStats.stopPositiveYAcceleration();
                break;
            default:
                break;
        }
    }

    ngOnInit() {

    }

    ngOnDestroy() {
    }

}
