import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '@app/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalog-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidenavComponent],
  template: `
    <app-sidenav />
    <router-outlet></router-outlet>
  `,
  styleUrl: './catalog-layout.component.scss',
})
export class CatalogLayoutComponent {}
