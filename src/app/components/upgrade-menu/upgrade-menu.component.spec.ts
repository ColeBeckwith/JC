import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeMenuComponent } from './upgrade-menu.component';

describe('UpgradeMenuComponent', () => {
  let component: UpgradeMenuComponent;
  let fixture: ComponentFixture<UpgradeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
