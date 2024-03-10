import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css',
})
export class ProductItemDetailComponent {
  id: number;
  product: Product;
  quantity: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.id = 0;
    this.product = { id: 0, name: '', price: 0, url: '', description: '' };
    this.quantity = 1;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get(
      'productId'
    ) as unknown as number;
    this.productService.getProducts().subscribe((p) => {
      this.product = p.find(
        (search) => search.id == this.id
      ) as unknown as Product;
    });
  }

  submit(): void {
    alert(`${this.quantity} of ${this.product.name} add to cart`);
    this.cartService.addToCart(this.product, this.quantity);
  }
}
