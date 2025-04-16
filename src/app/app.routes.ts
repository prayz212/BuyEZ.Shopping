import { Routes } from '@angular/router';
import { SignInComponent } from './features/accounts/views/sign-in/sign-in.component';
import { SignUpComponent } from './features/accounts/views/sign-up/sign-up.component';
import { HomeComponent } from './features/home/views/home/home.component';
import { ProductDetailComponent } from './features/products/views/product-detail/product-detail.component';
import { ProductListComponent } from './features/products/views/product-list/product-list.component';

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
];
