import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerShieldComponent } from './player-shield.component';

describe('PlayerShieldComponent', () => {
  let component: PlayerShieldComponent;
  let fixture: ComponentFixture<PlayerShieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerShieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerShieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
