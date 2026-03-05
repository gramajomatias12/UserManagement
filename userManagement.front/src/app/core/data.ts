import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Data {
    // Cambia el puerto (ej: 7245 o 5000) y la ruta según tu configuración
  private urlApi = 'http://localhost:5035/api/Entidad';

  constructor(private http: HttpClient) { }

  getEntidad(entidad: string): Observable<any> {
    return this.http.get(`${this.urlApi}/${entidad}`);
  }

  postEntidad(entidad: string, objeto: any): Observable<any> {
    // Convertimos el objeto a JSON string para que el backend lo reciba como "jsParametro"
    const jsonString = JSON.stringify(objeto);
    
    // En tu backend, el controlador debería tener un método POST que reciba esto
    return this.http.post(`${this.urlApi}/${entidad}`, { jsonParametros: jsonString });
  }
}
