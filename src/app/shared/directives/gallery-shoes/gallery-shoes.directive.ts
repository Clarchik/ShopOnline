import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appGalleryShoes]'
})
export class GalleryShoesDirective {

    constructor(private el: ElementRef,
                private r: Renderer2) { }

    @HostListener('mouseenter') onEnter() {
        this.r.setStyle(this.el.nativeElement.firstChild, 'transition', '0.7s all');
        this.r.setStyle(this.el.nativeElement.firstChild, 'transform', 'scale(1.1)');
        this.r.setStyle(this.el.nativeElement.children[1], 'transition', '0.7s all');
        this.r.setStyle(this.el.nativeElement.children[1], 'opacity', 1);
    }
    @HostListener('mouseleave') onLeave() {
        this.r.setStyle(this.el.nativeElement.firstChild, 'transform', 'scale(1)');
        this.r.setStyle(this.el.nativeElement.children[1], 'opacity', 0);
    }
}
