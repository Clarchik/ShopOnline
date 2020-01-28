import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login-guard.guard';

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginGuard]
        });
    });

    it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
        expect(guard).toBeTruthy();
    }));
});
