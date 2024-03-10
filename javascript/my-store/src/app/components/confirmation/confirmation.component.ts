import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
export class ConfirmationComponent {
  constructor(private cartService: CartService) {}
  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
