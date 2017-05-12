import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BattleScreenComponent} from "./components/battle-screen/battle-screen.component";

const routes: Routes = [
  {path: '', redirectTo: '/battle', pathMatch: 'full'},
  {path: 'battle', component: BattleScreenComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
