import { TestBed, async, inject } from '@angular/core/testing';

import { MakeOrderGuard } from './make-order-component.guard';

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MakeOrderGuard]
        });
    });

    it('should ...', inject([MakeOrderGuard], (guard: MakeOrderGuard) => {
        expect(guard).toBeTruthy();
    }));
});
