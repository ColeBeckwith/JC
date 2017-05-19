import {Injectable} from '@angular/core';
import {Shield} from "../../interfaces/Shield";
import {Projectile} from "../../interfaces/Projectile";
import {ProjectilesService} from "../projectiles-service/projectiles.service";
import {Enemy} from "../../interfaces/Enemy";
import {EnemiesService} from "../enemies-service/enemies.service";
import {Player} from "../../interfaces/Player";
import {Bomb} from "../../interfaces/Bomb";

@Injectable()
export class CollisionDetectionService {

    constructor(private projectilesService: ProjectilesService,
                private enemiesService: EnemiesService) {
    }


    detectCollisions(fps, player, enemies, projectiles, bombs) {
        // 1. Check all enemies and projectiles against shield.
        // 2. Check player against enemies and projectiles,
        // 3. Check enemies against all projectiles.

        projectiles.forEach((projectile: Projectile, index) => {
            if (!projectile.friendly) {
                let distance = this.distanceBetween(projectile.location, player.location);
                if (distance < player.shield.distanceFromPlayer + player.dimensions.radius + projectile.dimensions.radius) {
                    if (player.shield.durability > 0) {
                        this.shieldProjectileCollision(player.shield, projectile, index);
                    }
                }
                if (distance < player.dimensions.radius + projectile.dimensions.radius) {
                    this.playerProjectileCollision(player, projectile, index);
                }
            } else if (projectile.friendly) {
                enemies.forEach((enemy) => {
                    if (projectile.power <= 0 || enemy.health <= 0) {
                        return;
                    }
                    let distance = this.distanceBetween(projectile.location, enemy.location);
                    if (distance < projectile.dimensions.radius + enemy.dimensions.radius) {
                        this.enemyProjectileCollision(enemy, projectile, index);
                    }
                })
            }
        });

        enemies.forEach((enemy) => {
            let distance = this.distanceBetween(enemy.location, player.location);
            if (distance < player.shield.distanceFromPlayer + enemy.dimensions.radius) {
                this.shieldEnemyCollision(player.shield, enemy);
            }
            if (distance < player.dimensions.radius + enemy.dimensions.radius) {
                this.playerEnemyCollision(player, enemy);
            }
        });

        for (let i = 0; i < enemies.length; i++) {
            for (let j = i + 1; j < enemies.length; j++) {
                let distance = this.distanceBetween(enemies[i].location, enemies[j].location);
                if (distance < enemies[i].dimensions.radius + enemies[j].dimensions.radius) {
                    this.enemyEnemyCollision(enemies[i], enemies[j], fps);
                }
            }
        }

        bombs.forEach((bomb: Bomb) => {
            projectiles.forEach((projectile: Projectile, index) => {
                if (bomb.friendly !== projectile.friendly) {
                    let distanceBetween = this.distanceBetween(bomb.origin, projectile.location);
                    if (distanceBetween < projectile.dimensions.radius + bomb.outerRadius && distanceBetween > bomb.innerRadius - projectile.dimensions.radius) {
                        this.projectilesService.destroyProjectileByIndex(index);
                    }
                }
            });

            enemies.forEach((enemy: Enemy) => {
                let distanceBetween = this.distanceBetween(bomb.origin, enemy.location);
                if (distanceBetween < enemy.dimensions.radius + bomb.outerRadius && distanceBetween > bomb.innerRadius - enemy.dimensions.radius) {
                    this.enemyBombCollision(enemy, bomb, fps);
                }
            });

            // TODO eventually detect collision with player as well once enemies have bombs.
        })
    }

    enemyEnemyCollision(enemy1: Enemy, enemy2: Enemy, fps: number) {
        // TODO eventually get these to bounce off each other.
        let first = enemy1.location;
        let firstMass = enemy1.dimensions.width;
        let second = enemy1.location;
        let secondMass = enemy2.dimensions.width;

        let newFirstXVel = (first.xVelocity * (firstMass - secondMass) + (2 * secondMass * second.xVelocity)) / (firstMass + secondMass);
        let newFirstYVel = (first.yVelocity * (firstMass - secondMass) + (2 * secondMass * second.yVelocity)) / (firstMass + secondMass);
        let newSecondXVel = (second.xVelocity * (secondMass - firstMass) + (2 * firstMass * first.xVelocity)) / (firstMass + secondMass);
        let newSecondYVel = (second.xVelocity * (secondMass - firstMass) + (2 * firstMass * first.yVelocity)) / (firstMass + secondMass);

        second.xVelocity = newFirstXVel;
        second.yVelocity = newFirstYVel;
        first.xVelocity = newSecondXVel;
        first.yVelocity = newSecondYVel;

    }

    enemyBombCollision(enemy: Enemy, bomb: Bomb, fps: number) {
        enemy.health -= bomb.power / fps;
        if (enemy.health < 0) {
            enemy.health = 0;
        }
    }

    enemyProjectileCollision(enemy: Enemy, projectile: Projectile, projectileIndex: number) {
        enemy.health -= projectile.power;
        if (enemy.health < 0) {
            enemy.health = 0;
        }
        this.projectilesService.destroyProjectileByIndex(projectileIndex);
    }

    shieldProjectileCollision(shield: Shield, projectile: Projectile, projectileIndex: number) {
        shield.durability--;
        this.projectilesService.destroyProjectileByIndex(projectileIndex)
    }

    shieldEnemyCollision(shield: Shield, enemy: Enemy) {
        let durability = shield.durability;
        shield.durability -= enemy.health;
        enemy.health -= durability;
        if (shield.durability < 0) {
            shield.durability = 0;
        }
        if (enemy.health < 0) {
            enemy.health = 0;
        }
    }

    playerEnemyCollision(player: Player, enemy: Enemy) {
        if (enemy.health === 0) {
            return;
        }
        let playerHealth = player.health;
        player.health -= enemy.health;
        enemy.health -= playerHealth;
        if (player.health < 0) {
            player.health = 0;
        }
        if (enemy.health < 0) {
            enemy.health = 0;
        }
    }

    playerProjectileCollision(player: Player, projectile: Projectile, projectileIndex: number) {
        // Take care to make sure the projectile has not already been destroyed by the shield.
        if (projectile.power === 0) {
            return;
        }
        player.health -= projectile.power;
        this.projectilesService.destroyProjectileByIndex(projectileIndex);
    }

    distanceBetween(firstPoint, secondPoint) {
        return Math.sqrt(Math.pow(firstPoint.x - secondPoint.x, 2) + Math.pow(firstPoint.y - secondPoint.y, 2));
    }

}
