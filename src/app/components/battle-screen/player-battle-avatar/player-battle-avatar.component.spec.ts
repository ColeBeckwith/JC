import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBattleAvatarComponent } from './player-battle-avatar.component';

describe('PlayerBattleAvatarComponent', () => {
  let component: PlayerBattleAvatarComponent;
  let fixture: ComponentFixture<PlayerBattleAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBattleAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBattleAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
