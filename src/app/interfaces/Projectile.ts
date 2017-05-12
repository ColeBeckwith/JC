import {AvatarLocation} from "./AvatarLocation";
import {Dimensions} from "./Dimensions";

export interface Projectile {
    location: AvatarLocation;
    dimensions: Dimensions;
    power: number;
    travelType: string; // linear for now.
    friendly: boolean;
    enemy: boolean;
    color: string;
    projectileId: number;
}
