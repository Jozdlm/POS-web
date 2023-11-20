import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationComponent { }
