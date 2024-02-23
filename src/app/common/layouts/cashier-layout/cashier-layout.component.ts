import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '@app/common/components/topbar/topbar.component';

@Component({
  selector: 'app-cashier-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TopbarComponent],
  template: `
    <div class="app-wrapper">
      <app-topbar />
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './cashier-layout.component.scss',
})
export class CashierLayoutComponent {}
