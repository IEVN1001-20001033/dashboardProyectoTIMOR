import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiURL = 'http://127.0.0.1:5000/api/ventas_api/ventas';

  constructor(private http: HttpClient) {}

  // obtenerVentas(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiURL}/datos`);
  // }

  // obtenerVentasMensuales(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiURL}/ventas-mensuales`);
  //}
  obtenerVentasMensuales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/ventas-mensuales`);
  }
  obtenerFobiasMes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/fobias-mes`);
  }
  
  obtenerVentasFobias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/fobias`);
  }
  
}
