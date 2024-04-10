import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './sales/_components/shopping-cart.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, ShoppingCartComponent],
  template: `
    <h1>PLAYGROUND</h1>

    <app-shopping-cart />
  `,
})
export class HomePage {}
