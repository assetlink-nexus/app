import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]', //atribute selector
})
export class DropdownDirective {
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen(): void {
    this.isOpen = !this.isOpen;
    let part = this.elRef.nativeElement.querySelector('.dropdown-menu');

    if (this.isOpen) {
      this.renderer.addClass(part, 'show');
    } else {
      this.renderer.removeClass(part, 'show');
    }
  }
  //   @HostBinding('class.show') isOpen = false;
  //   @HostListener('click') toggleOpen() {
  //     this.isOpen = !this.isOpen;
  //   }

  //   constructor() {}

  //   constructor(private elementRef: ElementRef) {}

  //   ngOnInit(): void {
  //     this.elementRef.nativeElement.style.display = 'none';
  //   }
}
