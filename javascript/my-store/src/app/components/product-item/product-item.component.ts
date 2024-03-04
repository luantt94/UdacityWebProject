import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterModule, NgFor, NgModel],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  quantity: number;
  listQuantity: number[];
  ngOnInit(): void {}
  constructor() {
    this.product = { id: 1, name: '', price: 0, url: '', description: '' };
    this.quantity = 1;
    this.listQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
}
