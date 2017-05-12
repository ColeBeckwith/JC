import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaHubBottomContainerComponent } from './arena-hub-bottom-container.component';

describe('ArenaHubBottomContainerComponent', () => {
  let component: ArenaHubBottomContainerComponent;
  let fixture: ComponentFixture<ArenaHubBottomContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaHubBottomContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaHubBottomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
