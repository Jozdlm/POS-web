import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent {
  public route = inject(ActivatedRoute);
  public productId = 0;

  constructor() {
    this.productId = Number(this.route.snapshot.params['id']);
    console.log(this.productId);
  }
}
