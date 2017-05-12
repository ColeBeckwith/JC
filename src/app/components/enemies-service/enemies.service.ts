import {Injectable} from '@angular/core';
import {Enemy} from "../../interfaces/Enemy";
import {ProjectilesService} from "../projectiles-service/projectiles.service";
import {BattleArenaService} from "../battle-arena-service/battle-arena.service";
import {Dimensions} from "../../interfaces/Dimensions";
import {AvatarLocation} from "../../interfaces/AvatarLocation";

@Injectable()
export class EnemiesService {
    enemies: Array<Enemy> = [];
    enemyCountdown = 0;
    difficultyLevel = 0;

    constructor(private projectilesService: ProjectilesService,
                private battleArenaService: BattleArenaService) {
    }

    initializeBattle() {
        this.enemies = [];
        this.enemyCountdown = 0;
        this.difficultyLevel = 0;
    }

    processStep(fps, playerLocation) {
        this.enemies.forEach((enemy) => {
            let angleToPlayer = Math.atan2(playerLocation.y - enemy.location.y, playerLocation.x - enemy.location.x);
            let xAngle = Math.cos(angleToPlayer);
            let yAngle = Math.sin(angleToPlayer);

            enemy.location.xAcceleration = xAngle * enemy.acceleration;
            enemy.location.yAcceleration = yAngle * enemy.acceleration;

            enemy.location.xVelocity += enemy.location.xAcceleration / fps;
            enemy.location.yVelocity += enemy.location.yAcceleration / fps;

            if (enemy.location.xVelocity > enemy.location.maxXVelocity) {
                enemy.location.xVelocity = enemy.location.maxXVelocity;
            } else if (enemy.location.xVelocity < enemy.location.maxXVelocity * -1) {
                enemy.location.xVelocity = enemy.location.maxXVelocity * -1;
            }

            if (enemy.location.yVelocity > enemy.location.maxYVelocity) {
                enemy.location.yVelocity = enemy.location.maxYVelocity;
            } else if (enemy.location.yVelocity < enemy.location.maxYVelocity * -1) {
                enemy.location.yVelocity = enemy.location.maxYVelocity * -1;
            }

            enemy.location.x += enemy.location.xVelocity / fps;
            enemy.location.y += enemy.location.yVelocity / fps;

            enemy.secondsExisted += 1 / fps;

            enemy.projectiles.forEach((projectile) => {
                if (enemy.secondsExisted % projectile.interval < (1 / fps)) {
                    let createdProjectile = this.projectilesService.createProjectile(
                        enemy.location,
                        enemy.dimensions,
                        projectile.dimensions,
                        {x: playerLocation.x, y: playerLocation.y},
                        projectile.velocity,
                        projectile.power,
                        false,
                        true,
                        projectile.travelType,
                        projectile.color
                    );
                    this.projectilesService.addProjectile(createdProjectile)
                }
            })
        });

        this.rollForEnemies(fps);
    }


    rollForEnemies(fps) {
        let averageEnemiesAddedPerSecond = .2;
        this.enemyCountdown += Math.random() * 2 * averageEnemiesAddedPerSecond / fps;

        if (this.enemyCountdown >= 1) {
            this.addRandomEnemy();
            this.enemyCountdown--;
        }
    }

    addRandomEnemy() {
        let maxAcceleration = 600;
        let minAcceleration = 150;
        let newEnemy = {
            secondsExisted: 0,
            acceleration: (Math.random() * (maxAcceleration - minAcceleration)) + minAcceleration,
            location: this.getRandomLocationOutsideArena(),
            health: 20,
            pointsAwarded: 10,
            comboBoost: .5,
            dimensions: {
                height: 20,
                width: 20,
                radius: 10
            },
            projectiles: [
                {
                    interval: 3.6,
                    power: 3,
                    travelType: 'linear',
                    velocity: 230,
                    dimensions: {
                        height: 8,
                        width: 8,
                        radius: 4
                    },
                    color: '#127167'
                }
            ]
        };

        this.enemies.push(newEnemy);
    }

    getRandomLocationOutsideArena(): AvatarLocation {
        let outOfXPlane = Math.floor(Math.random() * 2) === 0;
        let outOfYPlane = !outOfXPlane;
        let negative = Math.floor(Math.random() * 2) === 0;

        let xCoordinate, yCoordinate;

        if (outOfXPlane) {
            if (negative) {
                xCoordinate = -20;
            } else {
                xCoordinate = this.battleArenaService.battleArena.width + 20;
            }
            yCoordinate = Math.floor(Math.random() * this.battleArenaService.battleArena.height);
        } else if (outOfYPlane) {
            if (negative) {
                yCoordinate = -20;
            } else {
                yCoordinate = this.battleArenaService.battleArena.height + 20;
            }
            xCoordinate = Math.floor(Math.random() * this.battleArenaService.battleArena.width);
        }

        let maxPossibleMaxVelocity = 120;
        let minPossibleMaxVelocity = 40;
        let maxVelocity = (Math.random() * (maxPossibleMaxVelocity - minPossibleMaxVelocity)) + minPossibleMaxVelocity;

        return {
            x: xCoordinate,
            y: yCoordinate,
            yAcceleration: 0,
            xAcceleration: 0,
            maxXVelocity: maxVelocity,
            maxYVelocity: maxVelocity,
            yVelocity: 0,
            xVelocity: 0
        }
    }

    destroyEnemyByIndex(index) {
        this.enemies.splice(index, 1);
    }

    checkForDeath(): Array<Enemy> {
        let defeatedEnemies = [];
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            if (this.enemies[i].health <= 0) {
                defeatedEnemies.push(this.enemies[i]);
                this.destroyEnemyByIndex(i);
            }
        }
        return defeatedEnemies;
    }

}
