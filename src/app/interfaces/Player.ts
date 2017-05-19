import {AvatarLocation} from "./AvatarLocation";
import {Dimensions} from "./Dimensions";
import {Shield} from "./Shield";
import {PlayerCurrency} from "./PlayerCurrency";

export interface Player {
    location: AvatarLocation;
    dimensions: Dimensions;
    accelerationSpeed: number;
    shield: Shield;
    health: number;
    maxHealth: number;
    currency: PlayerCurrency;
    primaryProjectile: any;
    powerups: any;
}
