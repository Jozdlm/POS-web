import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-form.component.html',
  styleUrl: './school-form.component.scss',
})
export class SchoolFormComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  public pageTitle: string = '';

  constructor() {
    this._activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.pageTitle = id ? 'Editar colegio' : 'Agregar colegio';
    });
  }
}
