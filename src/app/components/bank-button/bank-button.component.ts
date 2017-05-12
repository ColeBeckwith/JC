import { Component, OnInit } from '@angular/core';
import {BattleEngineService} from "../battle-engine/battle-engine.service";

@Component({
  selector: 'jcx-bank-button',
  templateUrl: './bank-button.component.html',
  styleUrls: ['./bank-button.component.scss']
})
export class BankButtonComponent implements OnInit {

  constructor(public battleEngine: BattleEngineService) { }

  ngOnInit() {
  }

  toggleBanking() {
      this.battleEngine.toggleBankCountdown();
  }

}
