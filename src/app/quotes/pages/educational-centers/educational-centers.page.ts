import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolService } from '@app/quotes/educational-centers/school.service';
import { RouterModule } from '@angular/router';
import { RecordStatusDirective } from '@app/common/directives/record-status.directive';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [CommonModule, RouterModule, RecordStatusDirective],
  templateUrl: './educational-centers.page.html',
  styleUrl: './educational-centers.page.scss',
})
export class EducationalCentersPage {
  public readonly schools$ = inject(SchoolService).getSchools();
}
