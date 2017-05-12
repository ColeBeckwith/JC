import {Injectable} from '@angular/core';

@Injectable()
export class GameStateService {
    banking: boolean = false;

    constructor() {
    }

    toggleBankCountdown() {
        this.banking
    }

}
