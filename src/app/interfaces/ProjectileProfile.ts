import {Dimensions} from "./Dimensions";
export interface ProjectileProfile {
    interval: number; // Minimum number of seconds between shots.
    power: number;
    travelType: string; // linear, homing etc.
    velocity: number;
    dimensions: Dimensions;
    color: string;
}
