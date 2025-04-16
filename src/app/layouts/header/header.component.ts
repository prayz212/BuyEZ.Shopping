import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Menu } from 'primeng/menu';
import { Menubar } from 'primeng/menubar';
import { Observable, take } from 'rxjs';
import { AccountActions } from '../../features/accounts/store/account.actions';
import {
  selectIsAuthenticated,
  selectRefreshToken,
} from '../../features/accounts/store/account.selectors';

@Component({
  selector: 'buyez-header',
  imports: [
    Menubar,
    AvatarModule,
    InputTextModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    Menu,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  accountItems: MenuItem[] | undefined;

  authenticated$!: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.authenticated$ = this.store.select(selectIsAuthenticated);

    this.onSignOut = this.onSignOut.bind(this); // Why we need to bind here?
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: '/home',
      },
      {
        label: 'Products',
        items: [
          {
            label: "Men's Fashion",
            routerLink: 'products/mens-fashion',
          },
          {
            label: "Women's Fashion",
            routerLink: 'products/womens-fashion',
          },
          {
            separator: true,
          },
          {
            label: 'All Products',
            routerLink: 'products',
          },
        ],
      },
      {
        label: 'About',
        routerLink: 'about',
      },
      {
        label: 'Contact',
        routerLink: 'contact',
      },
    ];

    this.accountItems = [
      {
        separator: true,
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      {
        label: 'Sign out',
        icon: 'pi pi-sign-out',
        command: this.onSignOut,
      },
    ];
  }

  onSignOut() {
    this.store
      .select(selectRefreshToken)
      .pipe(
        // Take the first emitted value and complete
        take(1)
      )
      .subscribe((refreshToken) => {
        if (refreshToken) {
          this.store.dispatch(AccountActions.logout({ refreshToken }));
        }
      });
  }
}
