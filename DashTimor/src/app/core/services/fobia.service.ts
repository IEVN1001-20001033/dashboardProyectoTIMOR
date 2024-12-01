import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FobiaTimor } from '../interfaces/fobia-timor';

@Injectable({
  providedIn: 'root'
})
export class FobiaService {
  
  constructor(private  http: HttpClient) { }
 
  public getFobiasActivas():Observable<FobiaTimor[]>{
    return this.http.get<FobiaTimor[]>('http://127.0.0.1:5000/api/fobia_api/fobias/activas')
  } 
  
  public getFobias():Observable<FobiaTimor[]>{
    return this.http.get<FobiaTimor[]>('http://127.0.0.1:5000/api/fobia_api/fobias')
  } 
  agregarFobia(datos:FobiaTimor){
    return this.http.post('http://127.0.0.1:5000/api/fobia_api/fobias', datos)
  }
  
  public getFobia(mat:number):Observable<FobiaTimor>{
    console.log(mat)
    return this.http.get<FobiaTimor>('http://127.0.0.1:5000/api/fobia_api/fobias/'+mat)
  }
   
  modificarFobia(mat:number,datos:FobiaTimor){
    return this.http.put('http://127.0.0.1:5000/api/fobia_api/fobias/'+mat, datos)
  }
  public EliminarFobia(mat:number):Observable<FobiaTimor>{
    return this.http.delete<FobiaTimor>('http://127.0.0.1:5000/api/fobia_api/fobias/'+mat)
  }

  subirFoto(formData: FormData) {
    return this.http.post<any>('http://localhost:5000/api/fobia_api/fobias/subir_foto', formData);
  }
}


