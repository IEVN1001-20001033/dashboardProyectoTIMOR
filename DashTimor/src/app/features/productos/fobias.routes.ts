import { Routes } from "@angular/router";

export default[
    {
        path: 'listafobias',
        loadComponent:()=>import('./fobias/fobias.component'),
    }, 
    {
        path: 'fobiasactivas',
        loadComponent:()=>import('./fobias-activas/fobias-activas.component'),
    },
    {
        path: 'agregar',
        loadComponent:()=>import('./agregar/agregar.component'),
    },
    {
        path: 'eliminar/:matricula',
        loadComponent:()=>import('./eliminar/eliminar.component'),
    },
    {
        path: 'editar/:matricula',
        loadComponent:()=>import('./editar/editar.component'),
    },
    
    
]as Routes