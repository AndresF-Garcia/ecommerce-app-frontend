import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then(m => m.productRoutes)
  },
  {
    path: 'cart',
    loadComponent: () => import('./layouts/main/main-layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/cart/pages/cart/cart-page')
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
