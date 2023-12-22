import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-school-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './school-form.component.html',
  styleUrl: './school-form.component.scss',
})
export class SchoolFormComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  public pageTitle: string = '';

  public schoolForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    isActive: [true, [Validators.required]],
  });

  constructor() {
    this._activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.pageTitle = id ? 'Editar colegio' : 'Agregar colegio';
    });
  }

  public onSubmitForm(): void {
    console.log('submited');
  }
}
