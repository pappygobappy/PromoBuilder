import { TestBed, inject } from '@angular/core/testing';

import { PromotionalsService } from './promotionals.service';

describe('PromotionalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromotionalServiceService]
    });
  });

  it('should ...', inject([PromotionalServiceService], (service: PromotionalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
