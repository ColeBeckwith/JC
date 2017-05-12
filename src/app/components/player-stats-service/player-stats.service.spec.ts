import { TestBed, inject } from '@angular/core/testing';

import { PlayerStatsService } from './player-stats.service';

describe('PlayerStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerStatsService]
    });
  });

  it('should ...', inject([PlayerStatsService], (service: PlayerStatsService) => {
    expect(service).toBeTruthy();
  }));
});
