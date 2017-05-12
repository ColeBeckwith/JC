import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerupMenuComponent } from './powerup-menu.component';

describe('PowerupMenuComponent', () => {
  let component: PowerupMenuComponent;
  let fixture: ComponentFixture<PowerupMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerupMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
