import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

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
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

