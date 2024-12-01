import { Routes } from "@angular/router";

export default[
    {
        path: 'login',
        loadComponent:()=>import('./login/login.component'),
    },
    {
        path: 'admin',
        loadComponent:()=>import('../perfiles/administrador/administrador.component'),
    },
    {
        path: 'cliente',
        loadComponent:()=>import('../perfiles/cliente/layout/layout.component'),
    },
    {
        path: 'desarrollador',
        loadComponent:()=>import('../perfiles/administrador/administrador.component'),
    },  
    
]as Routes