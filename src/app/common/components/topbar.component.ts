import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule],
  template: `
    <p class="fw-medium fs-6 mb-0">Librería La Joya</p>

    <div class="switch-view">
      <button class="btn" routerLink="/">
        <ui-icon iconName="clipboard-data" />
      </button>
      <div class="switch-line"></div>
      <button class="btn" routerLink="/sell">
        <ui-icon iconName="shop-window" />
      </button>
    </div>
  `,
  styles: `
    :host {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 32px;
    }

    .switch-view {
      display: flex;
      border: 1px solid #c2c2c2;
      border-radius: 4px;
    }

    .switch-line {
      min-height: 100%;
      width: 1px;
      background-color: #c2c2c2;
    }

    .switch-view > button:first-child {
      border-radius: 4px 0 0 4px;
    }

    .switch-view > button:last-child {
      border-radius: 0 4px 4px 0;
    }
  `,
})
export class TopbarComponent {}
