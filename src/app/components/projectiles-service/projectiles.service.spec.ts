import { TestBed, inject } from '@angular/core/testing';

import { ProjectilesService } from './projectiles.service';

describe('ProjectilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectilesService]
    });
  });

  it('should ...', inject([ProjectilesService], (service: ProjectilesService) => {
    expect(service).toBeTruthy();
  }));
});
