import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'administrador',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard.component')
            },{
                path: 'listausuarios',
                loadComponent:()=>import('./usuarios/usuarios.component'),
            },
            {
                path: 'agregar',
                loadComponent:()=>import('./agregar/agregar.component')
            },
            {
                path: 'eliminar/:matricula',
                loadComponent:()=>import('./eliminar/eliminar.component'),
            },
            {
                path: 'editar/:matricula',
                loadComponent:()=>import('./editar/editar.component'),
            }, 
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    },    
    {
        path: 'eliminar/:matricula',
        loadComponent:()=>import('./eliminar/eliminar.component'),
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
