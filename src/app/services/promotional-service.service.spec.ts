import { TestBed, inject } from '@angular/core/testing';

import { PromotionalsService } from './promotionals.service';

describe('PromotionalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromotionalsService]
    });
  });

  it('should ...', inject([PromotionalsService], (service: PromotionalsService) => {
    expect(service).toBeTruthy();
  }));
});
