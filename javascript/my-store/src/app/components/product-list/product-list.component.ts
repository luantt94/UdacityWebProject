import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgForOf, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products = [];
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products as Product[];
    });
  }

  addProductToCart(product: Product, quantity: number): void {
    alert(`${quantity ? quantity : 1} of ${product.name} add to cart`);
    this.cartService.addToCart(product, quantity);
    alert(this.cartService.getListItem().length);
  }
}
