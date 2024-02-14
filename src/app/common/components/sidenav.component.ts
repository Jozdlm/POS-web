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
  template: `
    <div>
      <div class="nav nav-pills flex-column mb-auto">
        @for (item of navItems; track $index) {
          <div class="nav-item">
            <a
              [routerLink]="item.path"
              class="nav-link link-body-emphasis nav-item-icon"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              <ui-icon [iconName]="item.icon" />
              <span>{{ item.placeholder }}</span>
            </a>
          </div>
        }
      </div>
    </div>
    <div>
      <hr />
      <button class="btn nav-item-icon" (click)="handleLogoutEvent()">
        <ui-icon iconName="box-arrow-left" />
        Cerrar Sesión
      </button>
    </div>
  `,
  styles: `
    :host {
      padding: 24px 16px;
      display: grid;
      grid-template-rows: 1fr max-content;
    }

    .nav-item-icon {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }
  `,
})
export class SidenavComponent {
  private readonly _sessionService = inject(SessionService);
  public readonly navItems: NavItemWithIcon[] = [
    {
      path: '',
      placeholder: 'Inicio',
      icon: 'house-door-fill',
    },
    {
      path: '/quotations',
      placeholder: 'Cotizaciones',
      icon: 'wallet-fill',
    },
    {
      path: '/products',
      placeholder: 'Productos',
      icon: 'bag-fill',
    },
    {
      path: '/categories',
      placeholder: 'Categorías',
      icon: 'tags-fill',
    },
    {
      path: '/schools',
      placeholder: 'Centros Educativos',
      icon: 'bank2',
    },
    {
      path: '/school-grades',
      placeholder: 'Grados Académicos',
      icon: 'bar-chart-fill',
    },
  ];

  public async handleLogoutEvent(): Promise<void> {
    await this._sessionService.logOut();
  }
}
