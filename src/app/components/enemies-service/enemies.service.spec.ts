import { TestBed, inject } from '@angular/core/testing';

import { EnemiesService } from './enemies.service';

describe('EnemiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnemiesService]
    });
  });

  it('should ...', inject([EnemiesService], (service: EnemiesService) => {
    expect(service).toBeTruthy();
  }));
});
