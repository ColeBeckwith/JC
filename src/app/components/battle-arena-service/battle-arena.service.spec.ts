import { TestBed, inject } from '@angular/core/testing';

import { BattleArenaService } from './battle-arena.service';

describe('BattleArenaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BattleArenaService]
    });
  });

  it('should ...', inject([BattleArenaService], (service: BattleArenaService) => {
    expect(service).toBeTruthy();
  }));
});
