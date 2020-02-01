import { TestBed } from '@angular/core/testing';

import { SetupFactory } from './setup-factory.service';

describe('SetupFactoryService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SetupFactory = TestBed.get(SetupFactory);
        expect(service).toBeTruthy();
    });
});
