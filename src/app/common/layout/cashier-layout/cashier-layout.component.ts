import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cashier-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <p>
      cashier-layout works!
    </p>
    <router-outlet></router-outlet>
  `,
  styleUrl: './cashier-layout.component.scss'
})
export class CashierLayoutComponent {

}
