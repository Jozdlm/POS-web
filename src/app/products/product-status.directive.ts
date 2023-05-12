import { Directive, ElementRef, Input, OnChanges, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[ProductStatus]',
  standalone: true
})
export class ProductStatusDirective implements OnChanges {
  private _elRef = inject(ElementRef);
  private _renderer = inject(Renderer2);

  @Input() public isActive!: boolean;

  ngOnChanges() {
    const element = this._elRef.nativeElement as HTMLElement;
    const elClass = (this.isActive) ? 'badge text-bg-success' : 'badge text-bg-secondary'

    element.innerText = (this.isActive) ? 'Activo' : 'Inactivo';
    this._renderer.setAttribute(element, 'class', elClass);
  }

}
