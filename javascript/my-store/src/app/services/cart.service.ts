import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { url } from 'inspector';

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
        price: product.price,
        pName: product.name,
        url: product.url,
      });
    }
  }

  deleteFromCart(id: number) {
    if (isNaN(id)) return;
    for (let index = 0; index < this.cards.length; index++) {
      if (this.cards[index].id == id) {
        this.cards.splice(index, 1);
        break;
      }
    }
  }

  getTotalPrice(): number {
    var total = 0;
    this.cards.forEach((item) => {
      total += item.price * item.quantity;
    });
    return Math.round(total * 100) / 100;
  }
}
