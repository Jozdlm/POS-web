import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from '@app/common/interfaces/nav-item';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/ui/components/icon.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="h-full w-full p-4">
      <div>
        @for (item of navItems(); track $index) {
          <a
            [routerLink]="['', item.path]"
            class="block rounded-lg px-4 py-2 text-slate-800 hover:bg-slate-100 hover:text-slate-950"
            routerLinkActive="bg-slate-100 text-slate-950"
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
  public navItems = input.required<NavItem[]>();
}
