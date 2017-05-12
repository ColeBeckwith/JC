import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyBattleAvatarComponent } from './enemy-battle-avatar.component';

describe('EnemyBattleAvatarComponent', () => {
  let component: EnemyBattleAvatarComponent;
  let fixture: ComponentFixture<EnemyBattleAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnemyBattleAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemyBattleAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
