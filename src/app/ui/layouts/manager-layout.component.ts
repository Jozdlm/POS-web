import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../../common/components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/common/components/icon.component';
import { TopbarComponent } from '@app/common/components/topbar/topbar.component';

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

    <div class="mx-auto w-full max-w-screen-2xl">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './manager-layout.component.scss',
})
export class ManagerLayoutComponent {}
