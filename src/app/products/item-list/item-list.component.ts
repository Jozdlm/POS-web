import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../product';
import { ProductStatusDirective } from '../product-status.directive';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductStatusDirective],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Input() public products: Product[] = [];

  @Output() public onDeleteProduct = new EventEmitter<number>();

  public deleteProduct(id: number): void {
    this.onDeleteProduct.emit(id);
  }
}
