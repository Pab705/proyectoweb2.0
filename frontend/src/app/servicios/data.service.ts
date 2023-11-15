import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl= 'http://localhost:8000/api/actualizar-datos/';

  constructor(private http: HttpClient) {}


  getData(): Observable<any[]> {
    //trae los datos del archivo json en la ruta definida (Implementar a futuro una ruta dinámica para manejar diferentes archivos)
    return this.http.get<any[]>('../../assets/scripts/alumnos.json');
  }

  getAlumnoPorId(id: number): Observable<any> {
    // Obtener el alumno específico según su ID
    return this.http.get<any[]>('../../assets/scripts/alumnos.json').pipe(map((alumnos: any[]) => alumnos.find(alumno => alumno.id === id))
    );
  }

  buscarAlumnos(query: string): Observable<any[]> {
    return this.getData().pipe(
      map((alumnos: any[]) => {
        // Realiza la búsqueda y filtra los alumnos según el nombre o el rut
        return alumnos.filter(alumno =>
          alumno.nombre.toLowerCase().includes(query.toLowerCase()) || alumno.rut.includes(query)
        );
      })
    );
  }

  actualizarDatos(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  
}
