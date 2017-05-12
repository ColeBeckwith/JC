export interface Powerup {
    initialUses: number;
    remainingUses: number;
    totalUses: number;
    power: number;
    useFn: Function;
    keyboardShortcut: string;
    description: string;
    displayName: string;
    cost: number;
    level: number;
}
