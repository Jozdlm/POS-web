import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './sales/_components/shopping-cart.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, ShoppingCartComponent],
  template: `
    <h1 class="mb-8 text-2xl font-medium">Bienvenido Usuario</h1>
    <p>Accesos Rápidos</p>
  `,
})
export class HomePage {}
