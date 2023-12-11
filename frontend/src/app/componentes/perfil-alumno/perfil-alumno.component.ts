import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.scss'],
})
export class PerfilAlumnoComponent implements OnInit{
  alumnoId: number | undefined;
  alumno: any; // Usar 'alumno' en lugar de 'alumnoId'

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.updateNavbarButtonGroupVisibility(false);
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const alumnoId = +idParam;
        this.dataService.getAlumnoPorId(alumnoId).subscribe(alumno => {
          this.alumno = alumno;
        });
      }
    });
  }

  ngOnDestroy(){
    this.dataService.updateNavbarButtonGroupVisibility(true);
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
  

}
