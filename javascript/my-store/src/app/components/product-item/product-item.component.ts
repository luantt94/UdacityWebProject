import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  ngOnInit(): void {}
  constructor() {
    this.product = { id: 1, name: '', price: 0, url: '', description: '' };
  }
}
