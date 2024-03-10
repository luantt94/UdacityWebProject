import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cards: Cart[];
  constructor(private productService: ProductService) {
    this.cards = [];
  }

  getListItem(): Cart[] {
    return this.cards;
  }

  addToCart(product: Product, quantity: number) {
    if (product === undefined) return;
    if (isNaN(quantity)) quantity = 1;
    const itemExist = this.cards.find((item) => item.id == product.id);
    if (itemExist) {
      itemExist.quantity = quantity;
    } else {
      this.cards.push({
        id: product.id,
        pId: product.id,
        quantity: quantity,
      });
    }
  }
}
