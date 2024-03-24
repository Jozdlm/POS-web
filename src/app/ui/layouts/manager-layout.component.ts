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
    <app-topbar />

    <div class="mx-auto w-full max-w-screen-xl px-4 py-2">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ManagerLayoutComponent {
  public navigationLinks = TOP_BAR_LINKS;
}
