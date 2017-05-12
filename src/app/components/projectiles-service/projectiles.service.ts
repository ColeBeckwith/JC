import {Injectable} from '@angular/core';
import {Projectile} from "../../interfaces/Projectile";
import {AvatarLocation} from "../../interfaces/AvatarLocation";
import {Dimensions} from "../../interfaces/Dimensions";
import {RawLocation} from "../../interfaces/RawLocation";
import {BattleArenaService} from "../battle-arena-service/battle-arena.service";

@Injectable()
export class ProjectilesService {
    projectiles: Array<Projectile> = [];
    nextProjectileId: number = 1;

    constructor(private battleArenaService: BattleArenaService) {
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    initializeBattle() {
        this.projectiles = [];
        this.nextProjectileId = 1;
    }

    destroyProjectileByIndex(index) {
        this.projectiles[index].power = 0;
        this.projectiles.splice(index, 1);
    }

    createProjectile(origin: AvatarLocation,
                     originatorDims: Dimensions,
                     projectileDimensions: Dimensions,
                     destination: RawLocation,
                     speed: number,
                     power: number,
                     friendly: boolean,
                     enemy: boolean,
                     travelType: string = 'linear',
                     color: string): Projectile {
        let angle = Math.atan2(destination.y - origin.y, destination.x - origin.x);
        let xAngle = Math.cos(angle);
        let yAngle = Math.sin(angle);

        let projectileLocation = {
            x: origin.x + xAngle * originatorDims.radius,
            y: origin.y + yAngle * originatorDims.radius,
            xVelocity: xAngle * speed,
            yVelocity: yAngle * speed,
            xAcceleration: 0,
            yAcceleration: 0,
            maxXVelocity: xAngle * speed,
            maxYVelocity: yAngle * speed,
        };

        let projectileId = this.nextProjectileId;
        this.nextProjectileId++;

        return {
            location: projectileLocation,
            dimensions: projectileDimensions,
            power: power,
            friendly: friendly,
            travelType: travelType,
            enemy: enemy,
            color: color,
            projectileId: projectileId
        }
    }

    processStep(fps) {
        this.projectiles.forEach((projectile, index) => {
            projectile.location.xVelocity += projectile.location.xAcceleration / fps;
            projectile.location.yVelocity += projectile.location.yAcceleration / fps;

            projectile.location.x += projectile.location.xVelocity / fps;
            projectile.location.y += projectile.location.yVelocity / fps;

            if (projectile.location.x + projectile.dimensions.radius < 0 ||
                projectile.location.x - projectile.dimensions.radius > this.battleArenaService.battleArena.width ||
                projectile.location.y + projectile.dimensions.radius < 0 ||
                projectile.location.y - projectile.dimensions.radius > this.battleArenaService.battleArena.height) {
                this.destroyProjectileByIndex(index);
            }
        })
    }

}
