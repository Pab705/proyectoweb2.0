import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private baseUrl= 'http://127.0.0.1:8000/api/download-files/';
  private apiUrl= '../../assets/scripts/alumnos.json';
  private apiUrlPasantias = '../../assets/scripts/pasantias.json';
  private apiUrlBecas = '../../assets/scripts/becas.json';
  private apiUrlEventos = '../../assets/scripts/eventos.json';
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
    //trae los datos del archivo json en la ruta definida
    return this.http.get<any[]>(this.apiUrl);
  }
  /*
  getAlumnoPorId(id: number): Observable<any> {
    // Obtener el alumno específico según su ID
    console.log("id: ",id);
    return this.http.get<any[]>(this.apiUrl).pipe(map((alumnos: any[]) => alumnos.find(alumno => alumno.id === id))
    );
  }
  */
  getAlumnoPorId(id: number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((alumnos: any[]) => alumnos.find(alumno => alumno.id === id))
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
      console.log(this.alumnosFiltrados$);
    });    
  }

  filtrarAlumnosPorPeriodo(alumnos:any[],periodo:string):any[]{
    const fechaActual = new Date();
    const fechaLimite = new Date();

    switch (periodo) {
      case 'semestreActual':
        const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
        const añoActual = fechaActual.getFullYear();
  
        return alumnos.filter((alumno) => {
          const [mesMatricula, añoMatricula] = alumno.ultimaMatricula.split('/');
          const mesMatriculaNum = parseInt(mesMatricula, 10);
          const añoMatriculaNum = parseInt(añoMatricula, 10);
  
          if (añoMatriculaNum === añoActual) {
            const esPrimerSemestre = mesMatriculaNum >= 1 && mesMatriculaNum <= 5;
            const esSegundoSemestre = mesMatriculaNum >= 6 && mesMatriculaNum <= 12;
  
            if (esPrimerSemestre && mesActual >= 1 && mesActual <= 6) {
              return true; // Coincide con el primer semestre del año actual
            } else if (esSegundoSemestre && mesActual >= 7 && mesActual <= 12) {
              return true; // Coincide con el segundo semestre del año actual
            }
          }
  
          return false;
        });

    case 'ultimoAnio':
      fechaLimite.setFullYear(fechaActual.getFullYear() - 1); // Retrocede 1 año
      break;

    case 'ultimos5anios':
      fechaLimite.setFullYear(fechaActual.getFullYear() - 5); // Retrocede 5 años
      break;

      case 'ultimos10Anios':
        fechaLimite.setFullYear(fechaLimite.getFullYear() - 10); // Retrocede 10 años
  
        return alumnos.filter((alumno) => {
          const [mesMatricula, añoMatricula] = alumno.ultimaMatricula.split('/');
          const mesMatriculaNum = parseInt(mesMatricula, 10);
          const añoMatriculaNum = parseInt(añoMatricula, 10);
  
          // Crear una fecha con la matrícula para comparar años
          const fechaMatricula = new Date(añoMatriculaNum, mesMatriculaNum - 1, 1);
  
          return fechaMatricula >= fechaLimite && fechaMatricula <= fechaActual;
        });

    default:
      fechaLimite.setFullYear(fechaActual.getFullYear() - 20); // Filtro predeterminado
  }
    console.log("Fecha límite: ",fechaLimite,"fecha actual: ",fechaActual);

    return alumnos.filter((alumno) => {
      const ultimaMatriculaFecha = this.parseFechaString(alumno.ultimaMatricula);
      return ultimaMatriculaFecha.getTime() >= fechaLimite.getTime() && ultimaMatriculaFecha <= fechaActual;
    });
  }

  private parseFechaString(fechaString: string): Date {
    const partes = fechaString.split('/'); // Fecha está en formato 'MM/YYYY'
    const mes = parseInt(partes[0], 10);
    const anio = parseInt(partes[1], 10);
    return new Date(anio, mes - 1, 1); // Restamos 1 al mes porque en JavaScript los meses van de 0 a 11
  }
  
  getPasantiasPorAlumno(alumnoId: number): Observable<any[]> {
    const url = `${this.apiUrlPasantias}?alumnoId=${alumnoId}`;
    return this.http.get<any[]>(url);
  }

  getBecasPorIdAlumno(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlBecas).pipe(
      map((becas: any[]) => becas.filter(beca => beca.idAlumno === id))
    );
  }

  getEventos(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlEventos).pipe(
      map((eventos: any[]) => eventos.filter(evento => evento.idAlumno === id))
    );
  }

  getRecursosBecas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlBecas);
  }

  getRecursosPasantias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlPasantias);
  }

  getRecursosEventos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlEventos);
  }
}