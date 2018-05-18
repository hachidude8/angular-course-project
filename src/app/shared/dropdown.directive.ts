import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

/* This directive add the open class to dropdowns
    but on bootstrap 4 this is useless
*/
@Directive({
    /* unique selector that doesn't mess with existing ones */
    selector: '[appDropdown]'
})

export class DropdownDirective {

    private isOpen = false;

    constructor(private _el: ElementRef) {
    }

    @HostBinding('class.show') get opened() {
        return this.isOpen;
    }
    @HostListener('click') open() {
        this.isOpen = true;
        this._el.nativeElement.querySelector('.dropdown-menu').classList.add('show')
    }
    @HostListener('document:click', ['$event.target']) close(targetElement) {

        const inside: boolean = this._el.nativeElement.contains(targetElement);

        if (!inside) {
            this.isOpen = false;
            this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
        }
    }

}
