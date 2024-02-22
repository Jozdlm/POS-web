import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule, MatIconModule],
  template: `
    <button class="fw-medium fs-6 mb-0 btn" routerLink="/">
      Librería La Joya
    </button>

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
  styles: `
    :host {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 32px;
    }

    .switch-button {
      border: 1px solid #c2c2c2;
      border-radius: 4px;
    }
  `,
})
export class TopbarComponent {}
