import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/ui/components/icon.component';
import { TopbarComponent } from '@app/ui/components/topbar/topbar.component';
import { NAVIGATION_LINKS } from '../../common/constants/navigation-links';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SidenavComponent,
    TopbarComponent,
    RouterModule,
    IconComponent,
  ],
  template: `
    <div
      class="grid w-full h-full max-w-[100vw] grid-cols-[280px_minmax(max-content,_1fr)]"
    >
      <app-sidenav [navigationItems]="navItems" />
      <div class="max-h-screen w-full overflow-auto p-4">
        <div class="mx-auto max-w-screen-md">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class ManagerLayoutComponent {
  public readonly navItems = NAVIGATION_LINKS;
}
