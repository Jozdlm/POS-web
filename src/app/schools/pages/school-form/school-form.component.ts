import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolService } from '@app/schools/services/school.service';

@Component({
  selector: 'app-school-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './school-form.component.html',
  styleUrl: './school-form.component.scss',
})
export class SchoolFormComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _schoolService = inject(SchoolService);
  public pageTitle: string = 'Crear colegio';
  public categoryId: number | null = null;

  public schoolForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    isActive: [true, [Validators.required]],
  });

  constructor() {
    this._activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.pageTitle = 'Editar colegio';
        this.categoryId = parseInt(id);
      }
    });
  }

  public onSubmitForm(): void {
    if (this.categoryId) {
    } else {
      const school = this.schoolForm.getRawValue();
      this._schoolService.createSchool({ ...school }).subscribe({
        next: (_) => {
          this.schoolForm.reset();
          this._router.navigateByUrl('schools');
        },
        error: (err) => console.error(err),
      });
    }
  }
}
