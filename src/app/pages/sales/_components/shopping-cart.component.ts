import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shopping-cart',
    imports: [CommonModule],
    template: `
    <p>Shopping cart</p>
  `
})
export class ShoppingCartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
