import {Injectable} from '@angular/core';
import {Projectile} from "../../interfaces/Projectile";
import {AvatarLocation} from "../../interfaces/AvatarLocation";
import {Dimensions} from "../../interfaces/Dimensions";
import {RawLocation} from "../../interfaces/RawLocation";
import {BattleArenaService} from "../battle-arena-service/battle-arena.service";
import {Bomb} from "../../interfaces/Bomb";

@Injectable()
export class ProjectilesService {
    projectiles: Array<Projectile> = [];
    nextProjectileId: number = 1;
    bombs: Array<Bomb> = [];
    nextBombId: number = 1;

    constructor(private battleArenaService: BattleArenaService) {
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    addBomb(bomb) {
        this.bombs.push(bomb);
    }

    initializeBattle() {
        this.projectiles = [];
        this.bombs = [];
        this.nextProjectileId = 1;
        this.nextBombId = 1;
    }

    destroyProjectileByIndex(index) {
        this.projectiles[index].power = 0;
        this.projectiles.splice(index, 1);
    }

    destroyBombByIndex(index) {
        console.log(index);
        this.bombs[index].power = 0;
        this.bombs.splice(index, 1);
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

    createBomb(origin: RawLocation,
               outerRadius: number,
               outerRadiusGrowthRate: number,
               innerRadius: number,
               innerRadiusGrowthRate: number,
               growthType: string,
               power: number,
               powerDropoff: number,
               color: string,
               friendly: boolean) {

        let bombId = this.nextBombId;
        this.nextBombId++;

        return {
            id: bombId,
            origin: origin,
            outerRadius: outerRadius,
            outerRadiusGrowthRate: outerRadiusGrowthRate,
            innerRadius: innerRadius,
            innerRadiusGrowthRate: innerRadiusGrowthRate,
            growthType: growthType,
            originalPower: power,
            power: power,
            powerDropoff: powerDropoff,
            color: color,
            friendly: friendly
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
        });
        let cornerToCornerDistance = Math.sqrt(Math.pow(this.battleArenaService.battleArena.width, 2) + Math.pow(this.battleArenaService.battleArena.height, 2));
        this.bombs.forEach((bomb: Bomb, index) => {
            bomb.power -= (bomb.powerDropoff / fps);
            bomb.outerRadius += bomb.outerRadiusGrowthRate / fps;
            bomb.innerRadius += bomb.innerRadiusGrowthRate / fps;
            if (bomb.innerRadius > cornerToCornerDistance) {
                this.destroyBombByIndex(index);
            }
        })
    }

}
