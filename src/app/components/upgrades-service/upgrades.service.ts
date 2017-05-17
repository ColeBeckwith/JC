import {Injectable} from '@angular/core';
import {PlayerStatsService} from "../player-stats-service/player-stats.service";

@Injectable()
export class UpgradesService {
    playerUpgrades = [
        {
            displayName: 'Projectiles',
            level: 1,
            cost: 25,
            upgradeFn: (upgrade) => this.bulletSpeedUpgrade(upgrade),
            locked: false,
            description: 'Increase the Speed of Player Bullets',
            keyboardShortcut: 'E'
        },
        {
            displayName: 'Shield',
            level: 1,
            cost: 15,
            upgradeFn: (upgrade) => this.upgradeShield(upgrade),
            locked: false,
            description: 'Improve the Quality of Player Shield',
            keyboardShortcut: 'R'

        },
        {
            displayName: 'Durability',
            level: 1,
            cost: 15,
            upgradeFn: (upgrade) => this.upgradeDurability(upgrade),
            locked: false,
            description: 'Increase Health and Regeneration',
            keyboardShortcut: 'T'
        }
    ];

    constructor(private playerStats: PlayerStatsService) {
    }

    triggerUpgradeByShortcut(shortcut) {
        this.playerUpgrades.forEach((upgrade) => {
            if (upgrade.keyboardShortcut === shortcut) {
                upgrade.upgradeFn(upgrade);
            }
        })
    }

    bulletSpeedUpgrade(upgrade) {
        if (this.playerStats.player.currency.faith < upgrade.cost) {
            return;
        }
        this.playerStats.player.currency.faith -= upgrade.cost;
        this.playerStats.player.primaryProjectile.cooldown *= .85;
        upgrade.level++;
        upgrade.cost = upgrade.cost * 2.3;
    }

    upgradeShield(upgrade) {
        if (this.playerStats.player.currency.faith < upgrade.cost) {
            return;
        }
        this.playerStats.player.currency.faith -= upgrade.cost;
        this.playerStats.player.shield.maxDurability += 10;
        this.playerStats.player.shield.durability = this.playerStats.player.shield.maxDurability;
        upgrade.level++;
        upgrade.cost = upgrade.cost * 2.3;

    }

    upgradeDurability(upgrade) {
        if (this.playerStats.player.currency.faith < upgrade.cost) {
            return;
        }
        this.playerStats.player.currency.faith -= upgrade.cost;

        this.playerStats.player.maxHealth += 50;
        this.playerStats.player.health = this.playerStats.player.maxHealth;
        upgrade.level++;
        upgrade.cost = upgrade.cost * 2.3;

    }


}
