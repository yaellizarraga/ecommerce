import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './auth/guards/auth.guards';
import { TokenGuard } from './auth/guards/token.guards';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'about-us',
        loadComponent: () => import('./about-us/about-us.page').then((m) => m.AboutUsPage),
      },
      {
        path: 'contact',
        loadComponent: () => import('./contact/contact.page').then((m) => m.ContactPage),
      },
      {
        path: 'all-products',
        loadComponent: () =>
          import('./all-products/all-products.page').then((m) => m.AllProductsPage),
      },
      {
        path: 'login',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./auth/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./auth/register/register.page').then((m) => m.RegisterPage),
      },
      {
        path: 'shopping-cart',
        loadComponent: () =>
          import('./shopping-cart/shopping-cart.page').then((m) => m.ShoppingCartPage),
      },
      {
        path: 'profile',
        canActivate: [TokenGuard],
        loadComponent: () =>
          import('./profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'address',
        canActivate: [TokenGuard],
        loadComponent: () =>
          import('./address/address.page').then((m) => m.AddressPage),
      },
      {
        path: 'order',
        canActivate: [TokenGuard],
        loadComponent: () =>
          import('./order/order.page').then((m) => m.OrderPage),
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

