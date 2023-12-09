import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private baseUrl= 'http://127.0.0.1:8000/api/download-files/';
  private apiUrl= '../../assets/data/alumnos.json';
  private alumnosFiltradosSubject: Subject<any[]> = new Subject<any[]>();
  alumnosFiltrados$ = this.alumnosFiltradosSubject.asObservable();
  private mostrarButtonGroup = true;

  constructor(private http: HttpClient) {}

  updateNavbarButtonGroupVisibility(value: boolean) {
    this.mostrarButtonGroup = value;
  }

  getNavbarButtonGroupVisibility(): boolean {
    return this.mostrarButtonGroup;
  }

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

  filtrarPorPeriodo(periodo: string): void {
    this.getData().pipe(
      map(alumnos => this.filtrarAlumnosPorPeriodo(alumnos, periodo))
    ).subscribe((alumnosFiltrados) => {
      this.alumnosFiltradosSubject.next(alumnosFiltrados);
    });
    console.log(this.alumnosFiltrados$)
  }

  filtrarAlumnosPorPeriodo(alumnos:any[],periodo:string):any[]{
    const fechaActual = new Date();
    const fechaLimite = new Date();
    
    switch (periodo) {
      case 'semestreActual':
        fechaLimite.setMonth(fechaLimite.getMonth() - 7); // Retrocede 6 meses
        break;
      case 'ultimoAnio':
        fechaLimite.setFullYear(fechaLimite.getFullYear() - 1); // Retrocede 1 año
        break;
      case 'ultimos5Anios':
        fechaLimite.setFullYear(fechaLimite.getFullYear() - 5); // Retrocede 5 años
        break;
      case 'ultimos10Anios':
        fechaLimite.setFullYear(fechaLimite.getFullYear() - 10); // Retrocede 10 años
        break;
      default:
        fechaLimite.setFullYear(fechaLimite.getFullYear() - 10); // Filtro predeterminado
    }

    return alumnos.filter(alumno => {
      const ultimaMatriculaFecha = this.parseFechaString(alumno.ultimaMatricula); // Parsear fecha string a Date
      return ultimaMatriculaFecha.getTime() >= fechaLimite.getTime() && ultimaMatriculaFecha <= fechaActual;
    });
  }

  private parseFechaString(fechaString: string): Date {
    const partes = fechaString.split('/'); // Fecha está en formato 'MM/YYYY'
    const mes = parseInt(partes[0], 10);
    const anio = parseInt(partes[1], 10);
    return new Date(anio, mes - 1, 1); // Restamos 1 al mes porque en JavaScript los meses van de 0 a 11
  }
    
  /*getAlumnosFiltrados(): any[] {
    return this.alumnosFiltrados;
  }

  getAlumnosPorPeriodo(periodo: string): Observable<any[]> {
    // Lógica para filtrar alumnos por el período seleccionado y devolverlos
    // operador 'filter' de RxJS
    return this.getData().pipe(
      map(alumnos => {
        // Implementa la lógica de filtrado según el período
        const fechaLimite = calcularFechaLimite(periodo); // Define esta función
        return alumnos.filter(alumno => alumno.ultimaMatricula >= fechaLimite);
      })
    );
  }
  
  calcularFechaLimite():Observable<any>{

  }

  actualizarDatos(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  */
}
