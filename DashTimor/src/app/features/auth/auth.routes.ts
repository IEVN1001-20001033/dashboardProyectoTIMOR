import { Routes } from "@angular/router";

export default[
    {
        path: 'login',
        loadComponent:()=>import('./login/login.component'),
    },
    {
        path: 'registrar',
        loadComponent:()=>import('./registrar/registrar.component'),
    }, 
    
]as Routes