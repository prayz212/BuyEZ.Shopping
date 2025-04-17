import { Routes } from '@angular/router';
import { SignInComponent } from './features/accounts/views/sign-in/sign-in.component';
import { SignUpComponent } from './features/accounts/views/sign-up/sign-up.component';
import { CartListComponent } from './features/carts/views/cart-list/cart-list.component';
import { CheckoutComponent } from './features/carts/views/checkout/checkout.component';
import { HomeComponent } from './features/home/views/home/home.component';
import { OrderDetailComponent } from './features/orders/views/order-detail/order-detail.component';
import { OrderListComponent } from './features/orders/views/order-list/order-list.component';
import { ProductDetailComponent } from './features/products/views/product-detail/product-detail.component';
import { ProductListComponent } from './features/products/views/product-list/product-list.component';
import { identityGuard } from './shared/guards/identity.guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'shopping-carts',
    component: CartListComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [identityGuard],
  },
  {
    path: 'order-history',
    component: OrderListComponent,
    canActivate: [identityGuard],
  },
  {
    path: 'order-history/:id',
    component: OrderDetailComponent,
    canActivate: [identityGuard],
  },
];
