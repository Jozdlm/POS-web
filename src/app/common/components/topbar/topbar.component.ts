import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule, MatIconModule],
  template: `
    <div class="switch-view">
      <button class="btn d-flex align-items-center column-gap-2 switch-button">
        <div class="d-flex align-items-center column-gap-2">
          <mat-icon inline>storefront</mat-icon>
          <span class="small-text">Administrador</span>
        </div>
        <mat-icon class="fs-4">expand_more</mat-icon>
      </button>
    </div>
  `,
  styleUrl: `./topbar.component.scss`,
})
export class TopbarComponent {}
