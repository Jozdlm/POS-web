import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-views-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidenavComponent],
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
  styleUrl: './views-shell.component.scss',
})
export class ViewsShellComponent {}
