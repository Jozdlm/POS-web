import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationComponent { }
