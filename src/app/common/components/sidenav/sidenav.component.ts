import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  public navItems: NavItem[] = [];

  @Input({
    required: true,
  })
  public set navigationItems(items: NavItem[]) {
    this.navItems = items;
  }
}
