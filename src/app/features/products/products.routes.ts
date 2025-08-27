import { Routes } from '@angular/router';

export const productRoutes : Routes = [
  {
    path: '',
    loadComponent: () => import('../../layouts/main/main-layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/products-list/products-page.component')
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];
