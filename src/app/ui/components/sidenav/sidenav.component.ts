import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from '@app/common/interfaces/nav-item';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/ui/components/icon.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="flex flex-col justify-between">
      <div>
        @for (item of navItems; track $index) {
          <a
            [routerLink]="['', item.path]"
            class="block w-56 rounded-lg px-4 py-2 font-medium text-slate-500 hover:bg-gray-100 hover:text-gray-950"
            routerLinkActive="bg-gray-100 text-gray-950"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <span>{{ item.placeholder }}</span>
          </a>
        }
      </div>
    </div>
  `,
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
