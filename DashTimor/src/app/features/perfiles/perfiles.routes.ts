import { Routes } from "@angular/router";

export default[
    {
        path: 'admin',
        loadComponent:()=>import('../perfiles/administrador/administrador.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('../perfiles/administrador/dashboard/dashboard.component')
            },{
                path: 'listausuarios',
                loadComponent:()=>import('../perfiles/administrador/usuarios/usuarios.component'),
            },
            {
                path: 'agregar',
                loadComponent:()=>import('../perfiles/administrador/agregar/agregar.component')
            },
            {
                path: 'eliminar/:matricula',
                loadComponent:()=>import('../perfiles/administrador/eliminar/eliminar.component'),
            },
            {
                path: 'editar/:matricula',
                loadComponent:()=>import('../perfiles/administrador/editar/editar.component'),
            }, 
            {
                path: 'listafobias',
                loadComponent:()=>import('../productos/fobias/fobias.component'),
            },
            {
                path: 'agregarfobias',
                loadComponent:()=>import('../productos/agregar/agregar.component')
            },
            {
                path: 'eliminarfobias/:idFobia',
                loadComponent:()=>import('../productos/eliminar/eliminar.component'),
            },
            {
                path: 'editarfobias/:idFobia',
                loadComponent:()=>import('../productos/editar/editar.component'),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }


        ],   

    },
    
    
]as Routes