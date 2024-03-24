import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[uiInputField]',
  standalone: true,
})
export class InputFieldDirective {
  private readonly elRef = inject(ElementRef);

  constructor() {
    (this.elRef.nativeElement as HTMLInputElement).classList.add(
      'rounded-lg',
      'border',
      'border-slate-300',
      'px-3',
      'py-2',
      'placeholder:text-sm',
      'placeholder:text-slate-500',
      'focus:outline-slate-800',
    );
  }
}
