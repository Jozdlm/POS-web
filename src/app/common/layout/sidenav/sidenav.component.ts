import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '@app/auth/services/session.service';
import { NavItemWithIcon } from '@app/common/interfaces/nav-item';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/common/components/icon.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  private readonly _sessionService = inject(SessionService);
  public readonly navItems: NavItemWithIcon[] = [
    {
      path: '',
      placeholder: 'Inicio',
      icon: 'bi bi-house-door-fill',
    },
    {
      path: '/quotations',
      placeholder: 'Cotizaciones',
      icon: 'bi bi-wallet-fill',
    },
    {
      path: '/products',
      placeholder: 'Productos',
      icon: 'bi bi-bag-fill',
    },
    {
      path: '/categories',
      placeholder: 'Categorías',
      icon: 'bi bi-tags-fill',
    },
    {
      path: '/schools',
      placeholder: 'Centros Educativos',
      icon: 'bi bi-bank2',
    },
    {
      path: '/school-grades',
      placeholder: 'Grados Académicos',
      icon: 'bi bi-bar-chart-fill',
    },
  ];

  public async handleLogoutEvent(): Promise<void> {
    await this._sessionService.logOut();
  }
}
