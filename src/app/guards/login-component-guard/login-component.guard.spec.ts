import { TestBed, async, inject } from '@angular/core/testing';

import { LoginComponentGuard } from './login-component.guard';

describe('AuthLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginComponentGuard]
    });
  });

  it('should ...', inject([LoginComponentGuard], (guard: LoginComponentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
