import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Input()
  public products: Product[] = [];

  @Output()
  public onDeleteProduct = new EventEmitter<number>();

  @Output()
  public onUpdateProduct = new EventEmitter<number>();

  public updateProduct(id: number): void {
    this.onUpdateProduct.emit(id);
  }

  public deleteProduct(id: number): void {
    this.onDeleteProduct.emit(id);
  }
}
