import { Injectable, AfterViewInit, HostListener } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SCREEN_SIZE } from '../../models/screen-size/screen-size';

@Injectable()
export class ResizeService {
    private resizeSubject: Subject<SCREEN_SIZE>;

    get onResize$(): Observable<any> {
        return this.resizeSubject.asObservable();
    }

    constructor() {
        this.resizeSubject = new Subject();
    }

    onResize(size: SCREEN_SIZE) {
        this.resizeSubject.next(size);
    }

}
