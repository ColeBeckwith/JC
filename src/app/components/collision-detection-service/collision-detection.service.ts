import {Injectable} from '@angular/core';
import {Shield} from "../../interfaces/Shield";
import {Projectile} from "../../interfaces/Projectile";
import {ProjectilesService} from "../projectiles-service/projectiles.service";
import {Enemy} from "../../interfaces/Enemy";
import {EnemiesService} from "../enemies-service/enemies.service";
import {Player} from "../../interfaces/Player";

@Injectable()
export class CollisionDetectionService {

    constructor(private projectilesService: ProjectilesService,
                private enemiesService: EnemiesService) {
    }


    detectCollisions(fps, player, enemies, projectiles) {
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
                    this.enemyEnemyCollision(enemies[i], enemies[j]);
                }
            }
        }

    }

    enemyEnemyCollision(enemy1, enemy2) {

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
