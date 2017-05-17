import {Injectable} from '@angular/core';
import {AvatarLocation} from "../../interfaces/AvatarLocation";
import {BattleArenaService} from "../battle-arena-service/battle-arena.service";
import {Dimensions} from "../../interfaces/Dimensions";
import {Player} from "../../interfaces/Player";
import {Shield} from "../../interfaces/Shield";
import {Enemy} from "../../interfaces/Enemy";
import {RawLocation} from "../../interfaces/RawLocation";
import {ProjectilesService} from "../projectiles-service/projectiles.service";

@Injectable()
export class PlayerStatsService {
    // acceleration is in pixels per second squared.
    // velocity is in pixels per second.
    playerPrimaryFiring = false;

    playerAimingAtLocation: RawLocation = null;

    player: Player = {
        health: 100,
        maxHealth: 100,
        accelerationSpeed: 380,
        shield: {
            maxDurability: 5,
            durability: 5,
            regenSeconds: 4,
            regenCountdown: 4,
            coverage: 'full',
            distanceFromPlayer: 10
        },
        location: {
            x: 50,
            y: 50,
            xVelocity: 0,
            maxXVelocity: 280,
            yVelocity: 0,
            maxYVelocity: 280,
            xAcceleration: 0,
            yAcceleration: 0
        },
        dimensions: {
            width: 20,
            height: 20,
            radius: 10
        },
        currency: {
            points: 0,
            faith: 0,
            combo: 1,
            comboMinimum: 1,
            comboDecayPerSecond: .1,
            comboDecayDelay: 2,
            comboDecayDelayCountdown: 2,
        },
        primaryProjectile: {
            cooldown: 1.4,
            cooldownTimer: 0,
            power: 10,
            speed: 260,
            dimensions: {
                width: 8,
                height: 8,
                radius: 4,
                speed: 160
            },
            color: '#2EC220'
        }
    };


    constructor(private battleArenaService: BattleArenaService,
                private projectilesService: ProjectilesService) {}

    checkForDeath() {
        if (this.player.health <= 0) {
            this.player.health = 0;
            return true;
        }
        return false;
    }

    loseGame() {
        this.player.currency.faith /= 2;
    }

    initializePlayer() {
        this.player.location.x = this.battleArenaService.battleArena.width / 2;
        this.player.location.y = this.battleArenaService.battleArena.height / 2;
        this.player.location.xAcceleration = 0;
        this.player.location.yAcceleration = 0;
        this.player.location.xVelocity = 0;
        this.player.location.yVelocity = 0;
        this.player.currency.points = 0;
        this.player.health = this.player.maxHealth;
        this.player.shield.durability = this.player.shield.maxDurability;
    }

    bankPoints() {
        this.player.currency.faith += Math.round(this.player.currency.points);
        this.player.currency.points = 0;
    }

    getRewardsForDefeatedEnemies(fps, defeatedEnemies: Array<Enemy>) {
        let currency = this.player.currency;
        if (defeatedEnemies.length === 0) {
            currency.comboDecayDelayCountdown -= 1 / fps;
            if (currency.comboDecayDelayCountdown <= 0) {
                currency.combo -= currency.comboDecayPerSecond / fps;
                if (currency.combo < currency.comboMinimum) {
                    currency.combo = currency.comboMinimum;
                }
            }
        } else {
            currency.comboDecayDelayCountdown = currency.comboDecayDelay;
        }

        defeatedEnemies.forEach((enemy: Enemy) => {
            currency.combo += enemy.comboBoost;
            currency.points += enemy.pointsAwarded * currency.combo;
        })
    }

    processStep(fps) {
        this.player.location.xVelocity += this.player.location.xAcceleration / fps;
        this.player.location.yVelocity += this.player.location.yAcceleration / fps;

        if (this.player.location.xVelocity < (this.player.location.maxXVelocity * -1)) {
            this.player.location.xVelocity = this.player.location.maxXVelocity * -1;
        } else if (this.player.location.xVelocity > this.player.location.maxXVelocity) {
            this.player.location.xVelocity = this.player.location.maxXVelocity;
        }

        if (this.player.location.yVelocity < (this.player.location.maxYVelocity * -1)) {
            this.player.location.yVelocity = this.player.location.maxYVelocity * -1
        } else if (this.player.location.yVelocity > this.player.location.maxYVelocity) {
            this.player.location.yVelocity = this.player.location.maxYVelocity;
        }

        this.player.location.x += this.player.location.xVelocity / fps;
        this.player.location.y += this.player.location.yVelocity / fps;

        if (this.player.location.x < this.player.dimensions.radius) {
            this.player.location.x = this.player.dimensions.radius;
            this.player.location.xVelocity = this.player.location.xVelocity * -.6;
        }

        if (this.player.location.x + this.player.dimensions.radius > this.battleArenaService.battleArena.width) {
            this.player.location.x = this.battleArenaService.battleArena.width - this.player.dimensions.radius;
            this.player.location.xVelocity = this.player.location.xVelocity * -.6;
        }

        if (this.player.location.y - this.player.dimensions.radius < 0) {
            this.player.location.y = this.player.dimensions.radius;
            this.player.location.yVelocity = this.player.location.yVelocity * -.6;
        }

        if (this.player.location.y + this.player.dimensions.radius > this.battleArenaService.battleArena.height) {
            this.player.location.y = this.battleArenaService.battleArena.height - this.player.dimensions.radius;
            this.player.location.yVelocity = this.player.location.yVelocity * -.6;
        }

        if (this.player.location.xAcceleration === 0) {
            this.player.location.xVelocity = this.player.location.xVelocity / 1.005;
        }

        if (this.player.location.yAcceleration === 0) {
            this.player.location.yVelocity = this.player.location.yVelocity / 1.005;
        }

        this.processShieldStep(fps, this.player.shield);
        this.processProjectilesStep(fps, this.player);
    }

    processShieldStep(fps: number, shield: Shield) {
        if (shield.durability < shield.maxDurability) {
            shield.regenCountdown -= 1 / fps;
            if (shield.regenCountdown <= 0) {
                shield.durability++;
                shield.regenCountdown += shield.regenSeconds;
            }
        } else {
            shield.regenCountdown = shield.regenSeconds;
        }
    }

    processProjectilesStep(fps: number, player: Player) {
        player.primaryProjectile.cooldownTimer -= 1 / fps;
        if (this.playerPrimaryFiring && this.playerAimingAtLocation && player.primaryProjectile.cooldownTimer <= 0) {
            let primaryProjectile = this.projectilesService.createProjectile(
                player.location,
                player.dimensions,
                player.primaryProjectile.dimensions,
                this.playerAimingAtLocation,
                player.primaryProjectile.speed,
                player.primaryProjectile.power,
                true,
                false,
                'linear',
                player.primaryProjectile.color
            );

            this.projectilesService.addProjectile(primaryProjectile);
            player.primaryProjectile.cooldownTimer += player.primaryProjectile.cooldown;
        } else if (player.primaryProjectile.cooldownTimer < 0) {
            player.primaryProjectile.cooldownTimer = 0;
        }
    }

    setXAccelerationToMax() {
        this.player.location.xAcceleration = this.player.accelerationSpeed;
    }

    setXAccelerationToMin() {
        this.player.location.xAcceleration = this.player.accelerationSpeed * -1;
    }

    setYAccelerationToMax() {
        this.player.location.yAcceleration = this.player.accelerationSpeed;
    }

    setYAccelerationToMin() {
        this.player.location.yAcceleration = this.player.accelerationSpeed * -1;
    }

    stopPositiveXAcceleration() {
        if (this.player.location.xAcceleration > 0) {
            this.player.location.xAcceleration = 0;
        }
    }

    stopNegativeXAcceleration() {
        if (this.player.location.xAcceleration < 0) {
            this.player.location.xAcceleration = 0;
        }
    }

    stopPositiveYAcceleration() {
        if (this.player.location.yAcceleration > 0) {
            this.player.location.yAcceleration = 0;
        }
    }

    stopNegativeYAcceleration() {
        if (this.player.location.yAcceleration < 0) {
            this.player.location.yAcceleration = 0;
        }
    }

}
