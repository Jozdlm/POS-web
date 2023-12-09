import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '@app/auth/services/session.service';
import { NavItem } from '@app/core/interfaces/nav-item';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  private readonly _sessionService = inject(SessionService);
  public readonly navItems: NavItem[] = [
    {
      path: '',
      placeholder: 'Inicio',
    },
    {
      path: '/dashboard',
      placeholder: 'Dashboard',
    },
    {
      path: '/quotations',
      placeholder: 'Cotizaciones',
    },
    {
      path: '/products',
      placeholder: 'Productos',
    },
    {
      path: '/categories',
      placeholder: 'Categorías',
    },
    {
      path: '/schools',
      placeholder: 'Centros Educativos',
    },
    {
      path: '/school-grades',
      placeholder: 'Grados Académicos',
    },
  ];

  public async handleLogoutEvent(): Promise<void> {
    await this._sessionService.logOut();
  }
}
