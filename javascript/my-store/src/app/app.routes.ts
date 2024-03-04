import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:productId', component: ProductItemDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'confirmation', component: ConfirmationComponent },
];
