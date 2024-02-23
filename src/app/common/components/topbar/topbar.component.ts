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
    <button class="switch-button">
      <p>Administrador</p>
      <mat-icon>expand_more</mat-icon>
    </button>
  `,
  styleUrl: `./topbar.component.scss`,
})
export class TopbarComponent {}
