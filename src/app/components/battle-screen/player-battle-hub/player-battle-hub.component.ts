import {Component, OnInit} from '@angular/core';
import {PlayerStatsService} from "../../player-stats-service/player-stats.service";

import {GaugeLabel, GaugeSegment} from 'ng2-kw-gauge';

@Component({
    selector: 'jcx-player-battle-hub',
    templateUrl: './player-battle-hub.component.html',
    styleUrls: ['./player-battle-hub.component.scss']
})
export class PlayerBattleHubComponent implements OnInit {
    labelX = 0;
    nameLabelY = -12;
    valueLabelY = 20;
    nameLabelFontSize = '1.5em';
    valueLabelFontSize = '2em';

    healthSegment = new GaugeSegment({color: '#228B22', borderWidth: 20});
    healthPercentageLabel = new GaugeLabel({color: '#228B22', x: this.labelX, y: this.valueLabelY, fontSize: this.valueLabelFontSize});
    healthNameLabel = new GaugeLabel({color: '#228B22', x:this.labelX, y: this.nameLabelY, fontSize: this.nameLabelFontSize, text: 'Health'});

    shieldSegment = new GaugeSegment({color: 'dodgerblue', borderWidth: 20});
    shieldPercentageLabel = new GaugeLabel({color: 'dodgerblue', x:this.labelX, y: this.valueLabelY, fontSize: this.valueLabelFontSize});
    shieldNameLabel = new GaugeLabel({color: 'dodgerblue', x:this.labelX, y: this.nameLabelY, fontSize: this.nameLabelFontSize, text: 'Shield'});

    comboSegment = new GaugeSegment({color: 'red', borderWidth: 20});
    comboLabel = new GaugeLabel({color: 'red', x:this.labelX, y: this.valueLabelY, fontSize: this.valueLabelFontSize});
    comboNameLabel = new GaugeLabel({color: 'red', x:this.labelX, y: this.nameLabelY, fontSize: this.nameLabelFontSize, text: 'Combo'});

    pointsSegment = new GaugeSegment({color: 'slategray', borderWidth: 20, value: 100});
    pointsLabel = new GaugeLabel({color: 'slategray', x:this.labelX, y: this.valueLabelY, fontSize: this.valueLabelFontSize});
    pointsNameLabel = new GaugeLabel({color: 'slategray', x:this.labelX, y: this.nameLabelY, fontSize: this.nameLabelFontSize, text: 'Points'});

    faithSegment = new GaugeSegment({color: 'gold', borderWidth: 20, value: 100});
    faithLabel = new GaugeLabel({color: 'gold', x: this.labelX, y: this.valueLabelY, fontSize: this.valueLabelFontSize});
    faithNameLabel = new GaugeLabel({color: 'gold', x: this.labelX, y: this.nameLabelY, fontSize: this.nameLabelFontSize, text: 'Faith'});

    constructor(public playerStats: PlayerStatsService) {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        this.healthSegment.value = this.playerStats.player.health / this.playerStats.player.maxHealth * 100;
        this.healthPercentageLabel.text = `${this.playerStats.player.health}/${this.playerStats.player.maxHealth}`;

        this.shieldSegment.value = this.playerStats.player.shield.durability / this.playerStats.player.shield.maxDurability * 100;
        this.shieldPercentageLabel.text = `${this.playerStats.player.shield.durability}/${this.playerStats.player.shield.maxDurability}`;

        this.comboSegment.value = this.playerStats.player.currency.combo % 1 * 100;
        this.comboLabel.text = `${Math.floor(this.playerStats.player.currency.combo)}X`;

        this.pointsLabel.text = `${Math.floor(this.playerStats.player.currency.points)}`;

        this.faithLabel.text = `${this.playerStats.player.currency.faith}`;
    }

}
