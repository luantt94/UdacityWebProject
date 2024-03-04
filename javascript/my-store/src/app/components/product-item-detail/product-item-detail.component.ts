import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css',
})
export class ProductItemDetailComponent {}
