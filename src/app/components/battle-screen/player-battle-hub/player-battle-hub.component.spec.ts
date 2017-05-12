import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBattleHubComponent } from './player-battle-hub.component';

describe('PlayerBattleHubComponent', () => {
  let component: PlayerBattleHubComponent;
  let fixture: ComponentFixture<PlayerBattleHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBattleHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBattleHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
