import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss']
})
export class ComunidadComponent implements OnInit{
  alumno:any;
  alumnosFiltrados: any[] = [];
  private alumnosFiltradosSubscription?: Subscription;

  constructor (private dataService:DataService, private router:Router){}

  redirigirAPerfil(id: number) {
    this.router.navigate(['/perfil', id]); // Ajusta la ruta según tu enrutamiento
  }

  calcularProgreso(alumno: any): number {
    // Lógica para calcular el progreso basado en el semestre
    const [num, denom] = alumno.semestre.split('/');
    return (+num / +denom) * 100;
  }

  esProgramaExtendido(alumno: any): boolean {
    const denominador = parseInt(alumno.semestre.split('/')[1], 10);
    return denominador > 8; // Si el denominador es mayor que 8, es un programa extendido
  }
  
calcularColor(alumno: any): { barra: string, texto: string } {
  const estadoAvance = alumno.estadoAvance;

  switch (estadoAvance) {
    case 'Cursando programa normalmente':
    case 'Programa Doctorado completo':
      return { barra: 'green', texto: 'whitesmoke' };
    case 'Interrupción de estudios':
    case 'Cursando último semestre permitido por programa':
      return { barra: 'yellow', texto: 'black' };
    case 'Alumno retirado del programa':
    case 'Alumno reprobado':
      return { barra: 'red', texto: 'whitesmoke' };
    default:
      return { barra: 'black', texto: 'whitesmoke' }; // Colores predeterminados en caso de estado desconocido
  }
}

  calcularWidth(alumno: any): string {
    const semestre = alumno.semestre;
    const extendido = semestre.includes('/12'); // Verificar si es extendido
    const numerador = Number(semestre.split('/')[0]);
    const denominador = Number(semestre.split('/')[1]);
  
    // Calcular el porcentaje de avance
    const progress = extendido ? (numerador / 12) : (numerador / 8);
    console.log(semestre,numerador,denominador,progress)
    return progress + '%';
  }

  ngOnInit() {
    /*this.dataService.getData().subscribe((result)=> {
      this.alumno=result;
    });*/
    this.dataService.filtrarPorPeriodo('semestreActual'); // Filtrar por este semestre por defecto
    this.alumnosFiltradosSubscription = this.dataService.alumnosFiltrados$.subscribe(
      (alumnosFiltrados) => {
        this.alumnosFiltrados = alumnosFiltrados;
        console.log(alumnosFiltrados);
      }
    );
  }

  ngOnDestroy() {
    if (this.alumnosFiltradosSubscription) {
      this.alumnosFiltradosSubscription.unsubscribe();
    }
  }

}
