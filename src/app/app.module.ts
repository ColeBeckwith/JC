import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {GaugeModule} from 'ng2-kw-gauge';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BattleScreenComponent} from './components/battle-screen/battle-screen.component';
import {BattleArenaComponent} from './components/battle-screen/battle-arena/battle-arena.component';
import {PlayerBattleAvatarComponent} from './components/battle-screen/player-battle-avatar/player-battle-avatar.component';
import {PlayerStatsService} from "./components/player-stats-service/player-stats.service";
import {BattleEngineService} from "./components/battle-engine/battle-engine.service";
import {BattleArenaService} from "./components/battle-arena-service/battle-arena.service";
import {ProjectilesService} from "./components/projectiles-service/projectiles.service";
import {ProjectileComponent} from './components/battle-screen/projectile/projectile.component';
import {PlayerShieldComponent} from './components/battle-screen/player-shield/player-shield.component';
import {EnemyBattleAvatarComponent} from './components/battle-screen/enemy-battle-avatar/enemy-battle-avatar.component';
import {EnemiesService} from "./components/enemies-service/enemies.service";
import {CollisionDetectionService} from "./components/collision-detection-service/collision-detection.service";
import {PlayerBattleHubComponent} from './components/battle-screen/player-battle-hub/player-battle-hub.component';
import {UpgradeMenuComponent} from './components/upgrade-menu/upgrade-menu.component';
import {PowerupMenuComponent} from './components/powerup-menu/powerup-menu.component';
import {UpgradesService} from "./components/upgrades-service/upgrades.service";
import {GameStateService} from "./components/game-state-service/game-state.service";
import { ArenaHubBottomContainerComponent } from './components/arena-hub-bottom-container/arena-hub-bottom-container.component';
import { BankButtonComponent } from './components/bank-button/bank-button.component';
import {PowerupsService} from "./components/powerups-service/powerups.service";

@NgModule({
    declarations: [
        AppComponent,
        BattleScreenComponent,
        BattleArenaComponent,
        PlayerBattleAvatarComponent,
        ProjectileComponent,
        PlayerShieldComponent,
        EnemyBattleAvatarComponent,
        PlayerBattleHubComponent,
        UpgradeMenuComponent,
        PowerupMenuComponent,
        ArenaHubBottomContainerComponent,
        BankButtonComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        GaugeModule
    ],
    providers: [
        PlayerStatsService,
        BattleEngineService,
        BattleArenaService,
        ProjectilesService,
        EnemiesService,
        CollisionDetectionService,
        UpgradesService,
        GameStateService,
        PowerupsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
