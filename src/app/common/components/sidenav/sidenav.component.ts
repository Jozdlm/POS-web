import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '@app/auth/services/session.service';
import { NavItem } from '@app/common/interfaces/nav-item';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/common/components/icon.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="nav nav-pills flex-column mb-auto">
      @for (item of navItems; track $index) {
        <div class="nav-item">
          <a
            [routerLink]="['', item.path]"
            class="nav-link link-body-emphasis nav-item-icon"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            (mouseover)="onHoverNavItem(item)"
          >
            <span>{{ item.placeholder }}</span>
          </a>
        </div>
      }
    </div>
  `,
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  private readonly _sessionService = inject(SessionService);
  public navItems: NavItem[] = [];

  @Input({
    required: true,
  })
  public set navigationItems(items: NavItem[]) {
    this.navItems = items;
  }

  public showSubnav = signal<boolean>(false);
  public currSubnavItems = signal<NavItem[]>([]);

  public onHoverNavItem(item: NavItem): void {
    if (item.children) {
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
