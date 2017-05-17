import {Injectable} from '@angular/core';
import {Powerup} from "../../interfaces/Powerup";
import {PlayerStatsService} from "../player-stats-service/player-stats.service";

@Injectable()
export class PowerupsService {
    powerups: Powerup[] = [
        {
            initialUses: 3,
            remainingUses: 3,
            power: 200,
            displayName: 'Pulse Bomb',
            cost: 400,
            description: 'Wipe Out Projectiles and Enemies',
            keyboardShortcut: '1',
            useFn: (powerup) => this.usePulseBomb(powerup),
            totalUses: 0,
            level: 1,
            duration: 0,
            timeRemaining: 0,
            active: false
        },
        {
            initialUses: 3,
            remainingUses: 3,
            power: 10,
            displayName: 'Combo Burst',
            cost: 400,
            description: 'Boost Combo Meter For A Short Duration',
            keyboardShortcut: '2',
            useFn: (powerup) => this.useComboBurst(powerup),
            totalUses: 0,
            level: 1,
            duration: 10,
            timeRemaining: 0,
            active: false
        },
        {
            initialUses: 3,
            remainingUses: 3,
            power: 2.5,
            displayName: 'Rapid Fire',
            cost: 400,
            description: 'Increase Rate of Fire',
            keyboardShortcut: '3',
            useFn: (powerup) => this.useRapidFire(powerup),
            totalUses: 0,
            level: 1,
            duration: 10,
            timeRemaining: 0,
            active: false
        }
    ];

    constructor(private playerStats: PlayerStatsService) {
    }

    triggerPowerupByShortcut(shortcut) {
        this.powerups.forEach((powerup) => {
            if (powerup.keyboardShortcut === shortcut) {
                powerup.useFn(powerup);
            }
        })
    }

    initializePowerups() {
        this.powerups.forEach((powerup) => {
            powerup.remainingUses = powerup.initialUses;
        })
    }

    usePulseBomb(powerup) {
        if (powerup.remainingUses <= 0 || this.playerStats.player.currency.points < powerup.cost) {
            return;
        }

        powerup.cost = powerup.cost * 2.8;
        powerup.active = true;
        powerup.remainingUses--;
        powerup.totalUses++;
    }

    useComboBurst(powerup) {
        if (powerup.remainingUses <= 0 || this.playerStats.player.currency.points < powerup.cost) {
            return;
        }

        powerup.cost = powerup.cost * 2.8;
        powerup.active = true;
        powerup.remainingUses--;
        powerup.totalUses++;
    }

    useRapidFire(powerup) {
        if (powerup.remainingUses <= 0 || this.playerStats.player.currency.points < powerup.cost) {
            return;
        }


        powerup.cost = powerup.cost * 2.8;
        powerup.active = true;
        powerup.remainingUses--;
        powerup.totalUses++;
    }


}
