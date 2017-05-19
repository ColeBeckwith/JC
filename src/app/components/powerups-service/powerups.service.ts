import {Injectable} from '@angular/core';
import {Powerup} from "../../interfaces/Powerup";
import {PlayerStatsService} from "../player-stats-service/player-stats.service";
import {ProjectilesService} from "../projectiles-service/projectiles.service";

@Injectable()
export class PowerupsService {
    powerups: Powerup[] = [
        {
            initialUses: 3,
            remainingUses: 3,
            power: 20000,
            displayName: 'Pulse Bomb',
            id: 'PulseBomb',
            firstCost: 0,
            cost: 400,
            description: 'Wipe Out Projectiles and Enemies',
            keyboardShortcut: '1',
            useFn: (powerup) => this.usePulseBomb(powerup),
            deactivateFn: (powerup) => this.deactivatePulseBomb(powerup),
            totalUses: 0,
            level: 1,
            duration: 0,
            timeRemaining: 0,
            active: false
        },
        {
            initialUses: 3,
            remainingUses: 3,
            power: 5,
            displayName: 'Combo Burst',
            id: 'ComboBurst',
            firstCost: 0,
            cost: 400,
            description: 'Boost Combo Meter For A Short Duration',
            keyboardShortcut: '2',
            useFn: (powerup) => this.useComboBurst(powerup),
            deactivateFn: (powerup) => this.deactivateComboBurst(powerup),
            totalUses: 0,
            level: 1,
            duration: 10,
            timeRemaining: 0,
            active: false
        },
        {
            initialUses: 3,
            remainingUses: 3,
            power: 20,
            displayName: 'Rapid Fire',
            id: 'RapidFire',
            firstCost: 0,
            cost: 400,
            description: 'Increase Rate of Fire',
            keyboardShortcut: '3',
            useFn: (powerup) => this.useRapidFire(powerup),
            deactivateFn: (powerup) => this.deactivateRapidFire(powerup),
            totalUses: 0,
            level: 1,
            duration: 10,
            timeRemaining: 0,
            active: false
        }
    ];

    constructor(private playerStats: PlayerStatsService,
                private projectilesService: ProjectilesService) {
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
            powerup.cost = powerup.firstCost;
        })
    }

    processStep(fps) {
        this.powerups.forEach((powerup) => {
            if (powerup.active) {
                powerup.timeRemaining -= 1 / fps;
                if (powerup.timeRemaining <= 0) {
                    powerup.deactivateFn(powerup)
                }
            }
        })

    }

    usePulseBomb(powerup) {
        if (powerup.remainingUses <= 0 || this.playerStats.player.currency.points < powerup.cost || powerup.active) {
            return;
        }

        let originLocation = {
            x: this.playerStats.player.location.x,
            y: this.playerStats.player.location.y
        };
        let bomb = this.projectilesService.createBomb(
            originLocation,
            this.playerStats.player.dimensions.radius + 15,
            160,
            this.playerStats.player.dimensions.radius,
            160,
            'Linear',
            powerup.power,
            20,
            '#B22222',
            true
        );

        this.projectilesService.addBomb(bomb);

        // Common functionality might be better in a separate function, but this allows tweaking each powerup
        // individually without adding a bunch of other properties to the model.
        powerup.timeRemaining = powerup.duration;
        powerup.cost = powerup.cost * 2.8;
        powerup.active = true;
        powerup.remainingUses--;
        powerup.totalUses++;
    }

    useComboBurst(powerup) {
        if (powerup.remainingUses <= 0 || this.playerStats.player.currency.points < powerup.cost || powerup.active) {
            return;
        }

        this.playerStats.player.currency.combo *= powerup.power;
        this.playerStats.player.powerups.comboBoostMultiplier = powerup.power;

        powerup.timeRemaining = powerup.duration;
        powerup.cost = powerup.cost * 2.8;
        powerup.active = true;
        powerup.remainingUses--;
        powerup.totalUses++;
    }

    useRapidFire(powerup) {
        if (powerup.remainingUses <= 0 || this.playerStats.player.currency.points < powerup.cost || powerup.active) {
            return;
        }

        this.playerStats.player.powerups.rapidFireBoost = powerup.power;

        powerup.timeRemaining = powerup.duration;
        powerup.cost = powerup.cost * 2.8;
        powerup.active = true;
        powerup.remainingUses--;
        powerup.totalUses++;
    }

    deactivatePulseBomb(powerup) {
        powerup.active = false;
        powerup.timeRemaining = 0;

        if (powerup.totalUses % 5 === 0) {
            powerup.level++;
            powerup.power += 100;
            powerup.initialUses++;
        }
    }

    deactivateComboBurst(powerup) {
        powerup.active = false;
        powerup.timeRemaining = 0;

        this.playerStats.player.currency.combo = Math.floor(this.playerStats.player.currency.combo / powerup.power);
        this.playerStats.player.powerups.comboBoostMultiplier = 1;

        if (powerup.totalUses % 5 === 0) {
            powerup.level++;
            powerup.power += 2;
            powerup.initialUses++;
        }
    }

    deactivateRapidFire(powerup) {
        powerup.active = false;
        powerup.timeRemaining = 0;

        this.playerStats.player.powerups.rapidFireBoost = 1;

        if (powerup.totalUses % 5 === 0) {
            powerup.level++;
            powerup.power += .5;
            powerup.initialUses++;
        }
    }


}
