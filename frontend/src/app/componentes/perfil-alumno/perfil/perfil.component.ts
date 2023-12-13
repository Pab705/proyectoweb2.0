import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/servicios/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit{
  alumno: any;
  eventos: any[] = [];
  becas: any[] = [];
  pasantias: any[] = [];
  recursosBecas: any[] = [];
  recursosPasantias: any[] = [];
  recursosEventos: any[] = [];

  @ViewChild('becasCanvas') becasCanvas!: ElementRef;
  @ViewChild('pasantiasCanvas') pasantiasCanvas!: ElementRef;
  @ViewChild('eventosCanvas') eventosCanvas!: ElementRef;
  @ViewChild('recursosPorAnioCanvas') recursosPorAnioCanvas!: ElementRef;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const alumnoId = +idParam;
        // Obtener datos del alumno
        this.dataService.getAlumnoPorId(alumnoId).subscribe(alumno => {
          this.alumno = alumno;
          console.log("Alumno: ", this.alumno);
        });

        // Obtener datos de eventos
        this.dataService.getEventos(alumnoId).subscribe(eventos => {
          this.eventos = eventos;
          console.log("Eventos: ", this.eventos);
          //this.crearGraficoEventos();
        });

        // Obtener datos de becas
        this.dataService.getBecasPorIdAlumno(alumnoId).subscribe(becas => {
          this.becas = becas;
          console.log("Becas: ", this.becas);
          //this.crearGraficoBecas();
        });

        // Obtener datos de pasantías
        this.dataService.getPasantiasPorAlumno(alumnoId).subscribe(pasantias => {
          this.pasantias = pasantias;
          console.log("Pasantías: ", this.pasantias);
          //this.crearGraficoPasantias();
        });
      }
    });
  }

  crearGraficoRecursosPorAnio() {
    const recursosPorAnio = this.agruparRecursosPorAnio(this.recursosBecas, this.recursosPasantias, this.recursosEventos);
    const labels = Object.keys(recursosPorAnio);
    const data = Object.values(recursosPorAnio);

    // Crear el gráfico usando Chart.js
    const recursosPorAnioChart = new Chart(this.recursosPorAnioCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Recursos por año',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true
          }
        }
      }
    });
  }

  agruparRecursosPorAnio(recursosBecas: any[], recursosPasantias: any[], recursosEventos: any[]): { [key: string]: number } {
    // Combinar todos los recursos en una sola matriz
    const todosLosRecursos = [...recursosBecas, ...recursosPasantias, ...recursosEventos];

    // Filtrar recursos por idAlumno
    const recursosAlumno = todosLosRecursos.filter(recurso => recurso.idAlumno === this.alumno.id);

   // Crear objeto para almacenar los recursos por año
   const recursosPorAnio: { [key: string]: number } = {};

    // Iterar sobre los recursos del alumno y agrupar por año
  recursosAlumno.forEach(recurso => {
    const año = recurso.anioAsignacion;
    if (!recursosPorAnio[año]) {
      recursosPorAnio[año] = 0;
    }
    recursosPorAnio[año] += parseFloat(recurso.recursosAsignados.replace(/\$|\.|,/g, '')) || 0;
  });
  console.log("todos los recursos",todosLosRecursos,"recursosAlumno: ",recursosAlumno,"recursosPorAnio: ", recursosPorAnio,"recursosPasantias: ",recursosPasantias,"recursos becas: ", recursosBecas,"recursos eventos: ",recursosEventos)
  return recursosPorAnio;
}};
