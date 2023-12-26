import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';

@Directive({
  selector: '[recordStatus]',
  standalone: true,
})
export class RecordStatusDirective implements OnChanges {
  private readonly _elRef: ElementRef<HTMLElement> = inject(ElementRef);

  @Input({
    required: true,
    alias: 'recordStatus',
  })
  public isActive!: boolean;

  public ngOnChanges(): void {
    const text = this.isActive ? 'Activo' : 'Inactivo';
    const bgColor = this.isActive ? 'text-bg-success' : 'text-bg-secondary';

    this._elRef.nativeElement.textContent = text;
    this._elRef.nativeElement.classList.add(bgColor);
  }
}
