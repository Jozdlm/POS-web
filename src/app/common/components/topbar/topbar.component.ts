import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TOP_BAR_LINKS } from './navigation-links';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule, MatIconModule],
  template: `
    <div>
      <div></div>
      <div class="navigation">
        @for (link of navigationLinks; track $index) {
          <a [routerLink]="link.path" class="navigation-link">{{ link.placeholder }}</a>
        }
      </div>
    </div>
    <div></div>
  `,
  styleUrl: `./topbar.component.scss`,
})
export class TopbarComponent {
  public readonly navigationLinks = TOP_BAR_LINKS;
}
