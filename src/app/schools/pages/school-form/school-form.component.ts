import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolService } from '@app/schools/services/school.service';
import { Subscription, of, switchMap } from 'rxjs';

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
  private readonly _subscriptions = new Subscription();
  public pageTitle: string = 'Crear colegio';
  public categoryId: number | null = null;

  public schoolForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    isActive: [true, [Validators.required]],
  });

  constructor() {
    this._subscriptions.add(this.setInitialValues());
    inject(DestroyRef).onDestroy(() => this._subscriptions.unsubscribe());
  }

  public setInitialValues(): Subscription {
    return this._activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');

          if (id) {
            this.pageTitle = 'Editar colegio';
            this.categoryId = parseInt(id);
            return this._schoolService.getSchoolById(this.categoryId);
          }

          return of(null);
        }),
      )
      .subscribe((resp) => {
        if (resp) {
          this.schoolForm.setValue({
            name: resp.name,
            isActive: resp.isActive,
          });
        }
      });
  }

  public resetAndReturn(): void {
    this.schoolForm.reset();
    this._router.navigateByUrl('schools');
  }

  public onSubmitForm(): void {
    if (this.categoryId) {
    } else {
      const school = this.schoolForm.getRawValue();
      this._schoolService.createSchool({ ...school }).subscribe({
        next: (_) => this.resetAndReturn(),
        error: (err) => console.error(err),
      });
    }
  }
}
