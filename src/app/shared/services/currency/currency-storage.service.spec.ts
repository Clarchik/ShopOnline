import { TestBed } from '@angular/core/testing';

import { CurrencyStorageService } from './currency-storage.service';

describe('CurrencyStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyStorageService = TestBed.get(CurrencyStorageService);
    expect(service).toBeTruthy();
  });
});
