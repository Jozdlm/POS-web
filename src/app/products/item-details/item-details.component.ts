import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {
  private _productService = inject(ProductService);
  public route = inject(ActivatedRoute);

  public productId = 0;
  public product = {};

  constructor() {
    this.productId = Number(this.route.snapshot.params['id']);
    this._productService.getProductById(this.productId).subscribe({
      next: (value) => {
        console.log(value);
        this.product = value;
      },
    });
  }
}
