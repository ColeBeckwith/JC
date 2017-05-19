export interface Powerup {
    initialUses: number;
    remainingUses: number;
    totalUses: number;
    power: number;
    useFn: Function;
    deactivateFn: Function;
    keyboardShortcut: string;
    description: string;
    displayName: string;
    id: string;
    firstCost: number;
    cost: number;
    level: number;
    duration: number;
    timeRemaining: number;
    active: boolean;
}
