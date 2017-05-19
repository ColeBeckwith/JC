import {AvatarLocation} from "./AvatarLocation";
import {Dimensions} from "./Dimensions";
import {ProjectileProfile} from "./ProjectileProfile";

export interface Enemy {
    location: AvatarLocation;
    dimensions: Dimensions;
    health: number;
    maxHealth: number;
    acceleration: number;
    projectiles: Array<ProjectileProfile>;
    secondsExisted: number;
    comboBoost: number;
    pointsAwarded: number;
}
