import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '@app/auth/services/session.service';
import { NavItem, NavItemWithIcon } from '@app/common/interfaces/nav-item';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/common/components/icon.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="sidenav-wrapper">
      <div>
        <div class="nav nav-pills flex-column mb-auto">
          @for (item of navItems; track $index) {
            <div class="nav-item">
              <a
                [routerLink]="item.path"
                class="nav-link link-body-emphasis nav-item-icon"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                (mouseover)="onHoverNavItem(item)"
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
    </div>
    @if (showSubnav()) {
      <div class="subnav-wrapper">
        @for (item of currSubnavItems(); track $index) {
          <p>{{item.placeholder}}</p>
        }
      </div>
    }
  `,
  styleUrl: './sidenav.component.scss',
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
      children: [
        {
          path: 'schools',
          placeholder: 'Centros Educativos',
        },
        {
          path: 'school-grades',
          placeholder: 'Grados Académicos',
        },
      ],
    },
    {
      path: '/products',
      placeholder: 'Productos',
      icon: 'bag-fill',
      children: [
        {
          path: 'categories',
          placeholder: 'Categorías',
        },
      ],
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

  public showSubnav = signal<boolean>(false);
  public currSubnavItems = signal<NavItem[]>([]);

  public onHoverNavItem(item: NavItem): void {
    if(item.children) {
      this.showSubnav.set(true);
      this.currSubnavItems.set(item.children);
    } else {
      this.showSubnav.set(false);
      this.currSubnavItems.set([]);
    }
  }

  public async handleLogoutEvent(): Promise<void> {
    await this._sessionService.logOut();
  }
}
