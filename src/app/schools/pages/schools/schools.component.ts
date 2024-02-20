import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolService } from '@app/quotations/services/school.service';
import { RouterModule } from '@angular/router';
import { RecordStatusDirective } from '@app/common/directives/record-status.directive';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [CommonModule, RouterModule, RecordStatusDirective],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss',
})
export class SchoolsComponent {
  public readonly schools$ = inject(SchoolService).getSchools();
}
