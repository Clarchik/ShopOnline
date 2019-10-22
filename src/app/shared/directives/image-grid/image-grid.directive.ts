import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appImageGrid]'
})
export class ImageGridDirective {

    constructor(private el: ElementRef,
                private r: Renderer2) { }

    @HostListener('mouseenter') onEnter() {
        this.r.setStyle(this.el.nativeElement.firstChild, 'transition', '0.4s all');
        this.r.setStyle(this.el.nativeElement.firstChild, 'transform', 'scale(1.06)');
    }
    @HostListener('mouseleave') onLeave() {
        this.r.setStyle(this.el.nativeElement.firstChild, 'transform', 'scale(1)');
    }

}
