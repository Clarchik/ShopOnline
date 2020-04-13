import { TestBed } from '@angular/core/testing';

import { SyncGuardHelperGuard } from './sync-guard-helper.guard';

describe('SyncGuardHelperGuard', () => {
  let guard: SyncGuardHelperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SyncGuardHelperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
