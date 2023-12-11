import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { Chart,registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit{
  recursosBecas: any[] = [];
  recursosPasantias: any[] = [];
  recursosEventos: any[] = [];
  becasChart: any;
  pasantiasChart: any;
  eventosChart: any;

  @ViewChild('becasCanvas') becasCanvas!: ElementRef;
  @ViewChild('pasantiasCanvas') pasantiasCanvas!: ElementRef;
  @ViewChild('eventosCanvas') eventosCanvas!: ElementRef;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Lógica para obtener datos de becas, pasantías y eventos...
    const becas$ = this.dataService.getRecursosBecas();
    const pasantias$ = this.dataService.getRecursosPasantias();
    const eventos$ = this.dataService.getRecursosEventos();
  
    forkJoin([becas$, pasantias$, eventos$]).subscribe(
      ([becas, pasantias, eventos]) => {
        this.recursosBecas = becas;
        this.recursosPasantias = pasantias;
        this.recursosEventos = eventos;
  
        // Luego de obtener los datos, crear los gráficos
        this.crearGraficoBecas();
        this.crearGraficoPasantias();
        this.crearGraficoEventos();
      },
      error => {
        // Manejar errores si es necesario
        console.log("No se pudieron cargar los gráficos. Datos de becas:",becas$,", pasantias: ", pasantias$, ", eventos: ", eventos$)
      }
    );
  }

  crearGraficoBecas() {
  const recursosBecasTotales = this.calcularTotalRecursos(this.recursosBecas);
  this.becasChart = new Chart(this.becasCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: ['Becas'],
      datasets: [{
        label: 'Total de recursos asignados',
        data: [recursosBecasTotales],
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

  crearGraficoPasantias() {
    const recursosPasantiasTotales = this.calcularTotalRecursos(this.recursosPasantias);
    this.pasantiasChart = new Chart(this.pasantiasCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Pasantías'],
        datasets: [{
          label: 'Total de recursos asignados',
          data: [recursosPasantiasTotales],
          backgroundColor: 'RGBA( 139, 0, 0, 1 )',
          borderColor: 'RGBA( 139, 0, 0, 1 )',
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

  crearGraficoEventos() {
    const recursosEventosTotales = this.calcularTotalRecursos(this.recursosEventos);
    this.eventosChart = new Chart(this.eventosCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Eventos'],
        datasets: [{
          label: 'Total de recursos asignados',
          data: [recursosEventosTotales],
          backgroundColor: 'RGBA( 0, 100, 0, 1 )',
          borderColor: 'RGBA( 0, 100, 0, 1 )',
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

  calcularTotalRecursos(recursos: any[]): number {
    return recursos.reduce((total, recurso) => {
      // Verifica si recurso.recursosAsignados existe y es un string antes de intentar limpiarlo
      if (recurso && typeof recurso.recursosAsignados === 'string') {
        const valorLimpio = parseFloat(recurso.recursosAsignados.replace(/\$|\.|,/g, ''));
        if (!isNaN(valorLimpio)) {
          return total + valorLimpio;
        }
      }
      return total;
    }, 0);
  }
}