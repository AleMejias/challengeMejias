import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'signin',
        loadComponent : () => import('./pages/auth/signin/signin.component')
    },
    {
        path: 'no-permissions',
        loadComponent : () => import('./pages/auth/no-permissions/no-permissions.component')
    },
    {
        path: 'post',
        canActivate: [AuthGuard],
        loadComponent : () => import('./pages/post/post.component')
    },
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    },
];
