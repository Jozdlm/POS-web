import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/common/components/icon.component';
import { TopbarComponent } from '@app/common/components/topbar/topbar.component';

@Component({
  selector: 'app-manager-layout',
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

    <div class="app-wrapper">
      <app-sidenav class="border-end bg-light" />

      <div class="views-wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrl: './manager-layout.component.scss',
})
export class ManagerLayoutComponent {}
