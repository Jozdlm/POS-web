import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '@app/auth/services/session.service';
import { NavItem, NavItemWithIcon } from '@app/common/interfaces/nav-item';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/common/components/icon.component';
import { NAVIGATION_LINKS } from './navigation-links';

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
    <!-- @if (showSubnav()) {
      <div class="subnav-wrapper">
        @for (item of currSubnavItems(); track $index) {
          <p>{{item.placeholder}}</p>
        }
      </div>
    } -->
  `,
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  private readonly _sessionService = inject(SessionService);
  public readonly navItems: NavItemWithIcon[] = NAVIGATION_LINKS;

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
