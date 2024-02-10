import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { IconComponent } from '@app/common/components/icon.component';
import { TopbarComponent } from '@app/common/components/topbar.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SidenavComponent,
    IconComponent,
    TopbarComponent
  ],
  template: `
    <div class="app-wrapper">
      <app-topbar />
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './views-shell.component.scss',
})
export class ViewsShellComponent {}
