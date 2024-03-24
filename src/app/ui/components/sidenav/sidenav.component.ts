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
            class="block w-56 rounded-md px-4 py-2 text-slate-500 hover:bg-slate-100 hover:font-medium hover:text-slate-950"
            routerLinkActive="text-slate-900 bg-slate-100 font-medium"
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
