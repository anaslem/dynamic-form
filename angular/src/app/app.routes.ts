import { authGuard, permissionGuard } from '@abp/ng.core';
import { Routes } from '@angular/router';
export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./test-select/test-select.component').then(c => c.TestSelectComponent),
  },
  {
    path: 'configurator',
    pathMatch: 'full',
    loadComponent: () => import('./features/vehicle-configurator/pages/vehicle-configurator-page/vehicle-configurator-page.component').then(c => c.VehicleConfiguratorPageComponent),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(c => c.createRoutes()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(c => c.createRoutes()),
  },
  {
    path: 'tenant-management',
    loadChildren: () => import('@abp/ng.tenant-management').then(c => c.createRoutes()),
  },
  {
    path: 'setting-management',
    loadChildren: () => import('@abp/ng.setting-management').then(c => c.createRoutes()),
  },
  {
    path: 'books',
    loadComponent: () => import('./book/book.component').then(c => c.BookComponent),
    canActivate: [authGuard, permissionGuard],
  },
  {
    path: 'authors',
    loadComponent: () => import('./author/author.component').then(c => c.AuthorComponent),
    canActivate: [authGuard, permissionGuard],
  },
  {
    path: 'quoter',
    loadComponent: () => import('./features/quoter/quoter-feature.component').then(m => m.QuoterFeatureComponent)
  },
  {
    path: 'configuratorapp',
    loadComponent: () => import('./features/vehicle-configurator-app/vehicle-configurator.component').then(m => m.VehicleConfiguratorComponent)
  },
   {
    path: 'configurateur',
    loadComponent: () => import('./features/vehicle-configurateur/vehicle-configurateur.component').then(m => m.VehicleConfigurateurComponent)
  }
];
