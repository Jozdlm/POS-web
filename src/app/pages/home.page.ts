import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './sales/_components/shopping-cart.component';

@Component({
    imports: [CommonModule, MatButtonModule, RouterModule, ShoppingCartComponent],
    template: `
    <main class="mx-auto mt-10 w-[90%] max-w-[800px]">
      <h1 class="mb-8 text-center text-2xl font-medium">
        Bienvenido, Nombre Usuario
      </h1>
      <div class="grid grid-cols-[repeat(5,_minmax(max-content,_1fr))] gap-x-6">
        <a
          class="flex cursor-pointer flex-col items-center rounded-md bg-zinc-50 p-4 shadow-sm shadow-zinc-200 drop-shadow-sm hover:bg-zinc-100"
          routerLink="/pos"
        >
          <img
            src="assets/icons/storefront.svg"
            alt="storefront icon"
            class="mb-3 block size-12"
          />
          <p>Punto de Venta</p>
        </a>
      </div>
    </main>
  `
})
export class HomePage {}
