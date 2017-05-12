import { TestBed, inject } from '@angular/core/testing';

import { UpgradesService } from './upgrades.service';

describe('UpgradesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpgradesService]
    });
  });

  it('should ...', inject([UpgradesService], (service: UpgradesService) => {
    expect(service).toBeTruthy();
  }));
});
