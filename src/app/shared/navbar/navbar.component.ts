import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public navItems: NavItem[] = [
    {
      path: '',
      name: 'Inicio',
    },
    {
      path: '/products',
      name: 'Productos',
    },
    {
      path: '/categories',
      name: 'Categorías',
    },
    {
      path: '/quotations',
      name: 'Cotizaciones',
    },
  ];
}
