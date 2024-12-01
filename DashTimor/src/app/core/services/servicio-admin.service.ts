import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosTimor } from '../interfaces/usuarios-timor';

@Injectable({
  providedIn: 'root'
})
export class ServicioAdminService {
  constructor(private  http: HttpClient) { }
 
 
  public getUsuarios():Observable<UsuariosTimor[]>{
    return this.http.get<UsuariosTimor[]>('http://127.0.0.1:5000/api/usr_api/usuarios')
  }
   
  agregarNuevoUsuario(datos:UsuariosTimor){
    return this.http.post('http://127.0.0.1:5000/api/usr_api/usuarios', datos)
  }
  
  public getUsuario(mat:number):Observable<UsuariosTimor>{
    console.log(mat)
    return this.http.get<UsuariosTimor>('http://127.0.0.1:5000/api/usr_api/usuarios/'+mat)
  }
   
  modificarUsuario(mat:number,datos:UsuariosTimor){
    return this.http.put('http://127.0.0.1:5000/api/usr_api/usuarios/'+mat, datos)
  }
  public EliminarUsuario(mat:number):Observable<UsuariosTimor>{
    return this.http.delete<UsuariosTimor>('http://127.0.0.1:5000/api/usr_api/usuarios/'+mat)
  }

  subirFoto(formData: FormData) {
    return this.http.post<any>('http://localhost:5000/api/usr_api/usuarios/subir_foto', formData);
  }
}
