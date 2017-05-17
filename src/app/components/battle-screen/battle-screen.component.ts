import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {PlayerStatsService} from "../player-stats-service/player-stats.service";
import {GameStateService} from "../game-state-service/game-state.service";
import {BattleEngineService} from "../battle-engine/battle-engine.service";
import {UpgradesService} from "../upgrades-service/upgrades.service";
import {PowerupsService} from "../powerups-service/powerups.service";
// import {HotkeysService, Hotkey} from "angular2-hotkeys";

@Component({
    selector: 'jcx-battle-screen',
    templateUrl: 'battle-screen.component.html',
    styleUrls: ['battle-screen.component.scss']
})
export class BattleScreenComponent implements OnInit, OnDestroy {

    constructor(private playerStats: PlayerStatsService,
                private battleEngine: BattleEngineService,
                private upgradesService: UpgradesService,
                private powerupsService: PowerupsService) {
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
                break;
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
            case 'KeyE':
            case 'KeyR':
            case 'KeyT':
                this.upgradesService.triggerUpgradeByShortcut(event.code.replace('Key', ''));
                break;
            case 'Digit1':
            case 'Digit2':
            case 'Digit3':
                this.powerupsService.triggerPowerupByShortcut(event.code.replace('Digit', ''));
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
