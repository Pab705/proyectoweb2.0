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
    this.dataService.updateNavbarButtonGroupVisibility(false);
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
        console.log("No se pudieron cargar los gráficos. Datos de becas:",becas$,", pasantias: ", pasantias$, ", eventos: ", eventos$,error);
      }
    );
  }

  crearGraficoBecas() {
  //const recursosBecasTotales = this.calcularTotalRecursos(this.recursosBecas);
  const recursosBecasPorAnio = this.agruparRecursosPorAnio(this.recursosBecas);
  const anios = Object.keys(recursosBecasPorAnio); // Obtener los años como etiquetas
  const data = Object.values(recursosBecasPorAnio); // Obtener los valores (recursos) por año
  console.log("Recursos por año: ",recursosBecasPorAnio,"Años: ",anios, "Recursos: ",data);

  this.becasChart = new Chart(this.becasCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: anios,
      datasets: [{
        label: 'Recursos Asignados',
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

  crearGraficoPasantias() {
    //const recursosPasantiasTotales = this.calcularTotalRecursos(this.recursosPasantias);
    const recursosPasantiasPorAnio = this.agruparRecursosPorAnio(this.recursosPasantias);
    const anios = Object.keys(recursosPasantiasPorAnio); // Obtener los años como etiquetas
    const data = Object.values(recursosPasantiasPorAnio); // Obtener los valores (recursos) por año
    this.becasChart = new Chart(this.pasantiasCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: anios,
        datasets: [{
          label: 'Recursos Asignados',
          data: data,
          backgroundColor: 'RGBA( 165, 42, 42, 1 )',
          borderColor: 'RGBA( 165, 42, 42, 1 )',
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
    //const recursosEventosTotales = this.calcularTotalRecursos(this.recursosEventos);
    const recursosEventosPorAnio = this.agruparRecursosPorAnio(this.recursosEventos);
    const anios = Object.keys(recursosEventosPorAnio); // Obtener los años como etiquetas
    const data = Object.values(recursosEventosPorAnio); // Obtener los valores (recursos) por año
    this.eventosChart = new Chart(this.eventosCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: anios,
        datasets: [{
          label: 'Recursos asignados',
          data: data,
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

  agruparRecursosPorAnio(recursos: any[]): { [key: string]: number } {
    const recursosPorAnio: { [key: string]: number } = {};
  
    recursos.forEach(recurso => {
      const año = recurso.anioAsignacion; // Reemplaza 'año' por el nombre del atributo que contiene el año en tu objeto
      const valorLimpio = parseFloat(recurso.recursosAsignados.replace(/\$|\.|,/g, ''));
  
      if (!isNaN(valorLimpio)) {
        if (!recursosPorAnio[año]) {
          recursosPorAnio[año] = 0;
        }
        recursosPorAnio[año] += valorLimpio;
      }
    });
  
    return recursosPorAnio;
  }
}