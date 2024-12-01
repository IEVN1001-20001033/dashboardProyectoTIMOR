import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'masbuscado',
                loadComponent: () => import('./negocio/mas-buscado/mas-buscado.component')
            },
            {
                path: '',
                redirectTo: 'masbuscado',
                pathMatch: 'full'
            }

        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('.//features/auth/auth.routes')
    },
    {
        path: 'fobias',
        loadChildren: () => import('.//features/productos/fobias.routes')
    },
    {
        path: 'perfiles',
        loadChildren: () => import('./features/perfiles/perfiles.routes')
      },
    {
        path: '**',
        redirectTo: 'masbuscado'
    }
];
