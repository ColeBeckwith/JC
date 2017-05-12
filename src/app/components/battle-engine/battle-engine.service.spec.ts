import { TestBed, inject } from '@angular/core/testing';

import { BattleEngineService } from './battle-engine.service';

describe('BattleEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BattleEngineService]
    });
  });

  it('should ...', inject([BattleEngineService], (service: BattleEngineService) => {
    expect(service).toBeTruthy();
  }));
});
