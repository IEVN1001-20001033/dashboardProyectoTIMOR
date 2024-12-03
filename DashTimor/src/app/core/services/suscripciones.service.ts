import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuscripcionesService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getSuscripcionesPorMes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/graficas_api/suscripciones/mes`);
  }

  getSuscripcionesPorFobia(mes?: number): Observable<any> {
    const url = mes ? `${this.baseUrl}/api/graficas_api/suscripciones/fobia?mes=${mes}` : `${this.baseUrl}/api/graficas_api/suscripciones/fobia`;
    return this.http.get(url);
  }
}
