import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/Cart';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  fullName: string;
  address: string;
  cardNumber: string;
  listCart: Cart[];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.fullName = '';
    this.address = '';
    this.cardNumber = '';
    this.listCart = [];
  }
  ngOnInit(): void {
    this.listCart = this.cartService.getListItem();
  }

  btnDeleteClick(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this.cartService.deleteFromCart(id);
      alert('Delete successfully!');
    }
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  changeAmount(id: number, quantity: number) {
    if (isNaN(quantity)) quantity = 1;
    const itemExist = this.listCart.find((item) => item.id == id);
    if (itemExist) {
      itemExist.quantity = quantity;
    }
  }

  refreshCart(): void {
    this.listCart = this.cartService.getListItem();
  }

  submit(): void {
    this.router.navigate(['/confirmation']);
  }
}
