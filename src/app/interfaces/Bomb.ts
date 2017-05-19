import {RawLocation} from "./RawLocation";

export interface Bomb {
    id: number;
    origin: RawLocation;
    outerRadius: number;
    outerRadiusGrowthRate: number;
    innerRadius: number;
    innerRadiusGrowthRate: number;
    growthType: string;
    originalPower: number;
    power: number;
    powerDropoff: number;
    color: string;
    friendly: boolean;
}
