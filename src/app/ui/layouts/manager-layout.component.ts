import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/ui/components/icon.component';
import { TopbarComponent } from '@app/ui/components/topbar/topbar.component';
import { TOP_BAR_LINKS } from '../components/topbar/navigation-links';

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
      class="grid w-full max-w-[100vw] grid-cols-[280px_minmax(max-content,_1fr)]"
    >
      <app-sidenav [navigationItems]="navItems" />
      <div class="mx-auto w-full max-w-screen-lg px-4 py-2">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class ManagerLayoutComponent {
  public readonly navItems = TOP_BAR_LINKS;
}
