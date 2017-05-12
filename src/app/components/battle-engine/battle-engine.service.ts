import {Injectable} from '@angular/core';
import {PlayerStatsService} from "../player-stats-service/player-stats.service";
import {ProjectilesService} from "../projectiles-service/projectiles.service";
import {EnemiesService} from "../enemies-service/enemies.service";
import {CollisionDetectionService} from "../collision-detection-service/collision-detection.service";
import {PowerupsService} from "../powerups-service/powerups.service";

@Injectable()
export class BattleEngineService {
    battleDigest = null;
    framesPerSecond: number = 33;
    banking: boolean = false;
    bankCountdown: number;


    constructor(private playerStats: PlayerStatsService,
                private projectilesService: ProjectilesService,
                private enemiesService: EnemiesService,
                private collisionDetectionService: CollisionDetectionService,
                private powerupsService: PowerupsService) {
    }

    initializeBattle() {
        this.playerStats.initializePlayer();
        this.enemiesService.initializeBattle();
        this.projectilesService.initializeBattle();
        this.powerupsService.initializePowerups();
        this.bankCountdown = 3;
    }

    startBattle() {
        this.battleDigest = setInterval(() => {
            this.battleStep()
        }, 1000 / this.framesPerSecond)
    }

    stopBattle() {
        if (this.battleDigest) {
            clearInterval(this.battleDigest);
        }
    }

    battleStep() {
        this.playerStats.processStep(this.framesPerSecond);
        this.projectilesService.processStep(this.framesPerSecond);
        this.enemiesService.processStep(this.framesPerSecond, this.playerStats.player.location);
        this.collisionDetectionService.detectCollisions(
            this.framesPerSecond,
            this.playerStats.player,
            this.enemiesService.enemies,
            this.projectilesService.projectiles
        );
        if (this.playerStats.checkForDeath()) {
            this.playerStats.loseGame();
            this.stopBattle();
            this.initializeBattle();
            setTimeout(() => {
                this.startBattle()
            }, 2000)
        }
        let defeatedEnemies = this.enemiesService.checkForDeath();
        this.playerStats.getRewardsForDefeatedEnemies(this.framesPerSecond, defeatedEnemies);

        // Run check for banking.
        if (this.banking) {
            this.bankCountdown -= 1 / this.framesPerSecond;
            if (this.bankCountdown <= 0) {
                this.bankCountdown = 0;
                this.banking = false;
                this.stopBattle();
                this.playerStats.bankPoints();
                this.initializeBattle();
                setTimeout(() => {
                    this.startBattle();
                }, 2000)
            }
        }
    }

    toggleBankCountdown() {
        this.banking = !this.banking;
        this.bankCountdown = 3;
    }
}
