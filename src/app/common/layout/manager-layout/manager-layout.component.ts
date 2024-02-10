import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/common/components/icon.component';

@Component({
  selector: 'app-manager-layout',
  standalone: true,
  imports: [CommonModule, SidenavComponent, RouterModule, IconComponent],
  template: `
    <div class="app-wrapper">
      <app-sidenav class="border-end bg-light" />

      <div class="content-wrapper">
        <div class="views-wrapper">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrl: './manager-layout.component.scss',
})
export class ManagerLayoutComponent {}
