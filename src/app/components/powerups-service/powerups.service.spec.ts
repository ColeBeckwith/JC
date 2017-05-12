import { TestBed, inject } from '@angular/core/testing';

import { PowerupsService } from './powerups.service';

describe('PowerupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowerupsService]
    });
  });

  it('should ...', inject([PowerupsService], (service: PowerupsService) => {
    expect(service).toBeTruthy();
  }));
});
