import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'blog-list',
    loadComponent: () => import('./pages/blog-list/blog-list.page').then( m => m.BlogListPage)
  },
  {
    path: 'blog-details/:id',
    loadComponent: () => import('./pages/blog-details/blog-details.page').then( m => m.BlogDetailsPage)
  },
  {
    path: 'blog-add',
    loadComponent: () => import('./pages/blog-add/blog-add.page').then( m => m.BlogAddPage)
  },
  {
    path: 'blog-edit/:id',
    loadComponent: () => import('./pages/blog-edit/blog-edit.page').then( m => m.BlogEditPage)
  },
  
];
