import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {
  alumnos: any[] = [];
  generoChart: any; // Declarar las propiedades para cada gráfico
  instiPregChart: any;
  cotutelaChart: any;
  nacionalidadChart: any;

  @ViewChild('generoCanvas') generoCanvas!: ElementRef;
  @ViewChild('instiPregCanvas') instiPregCanvas!: ElementRef;
  @ViewChild('cotutelaCanvas') cotutelaCanvas!: ElementRef;
  @ViewChild('nacionalidadCanvas') nacionalidadCanvas!: ElementRef;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.updateNavbarButtonGroupVisibility(false);
    this.dataService.getData().subscribe(
      (alumnos) => {
        this.alumnos = alumnos;

        this.crearGraficoGenero();
        this.crearGraficoInstiPreg();
        this.crearGraficoCotutela();
        this.crearGraficoNacionalidad();
      },
      error => {
        console.error("Error al obtener los datos de los alumnos:", error);
      }
    );
  }

  crearGraficoGenero() {
    const generoCounts = this.contarValores(this.alumnos, 'genero');
    const labels = Object.keys(generoCounts);
    const data = Object.values(generoCounts);

    this.generoChart = new Chart(this.generoCanvas.nativeElement, {
      type: 'pie', // Cambia el tipo de gráfico según tu preferencia ('pie', 'bar', 'line', etc.)
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad por Género',
          data: data,
          backgroundColor: ['RGBA( 218, 165, 32, 1 )', 'RGBA( 139, 69, 19, 1 )'], // Puedes cambiar los colores
          borderColor: 'black',
          borderWidth: 1
        }]
      },
      options: {
        // Configuración opcional de las opciones del gráfico
      }
    });
  }

  crearGraficoInstiPreg() {
    const instiPregCounts = this.contarValores(this.alumnos, 'instiPreg');
    const labels = Object.keys(instiPregCounts);
    const data = Object.values(instiPregCounts);

    this.instiPregChart = new Chart(this.instiPregCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de alumnos',
          data: data,
          backgroundColor: 'RGBA( 30, 144, 255, 1 )',
          borderColor: 'RGBA( 30, 144, 255, 1 )',
          borderWidth: 1
        }]
      },
      options: {
        // Configuración opcional de las opciones del gráfico
      }
    });
  }

  crearGraficoCotutela() {
    const cotutelaCounts = this.contarValores(this.alumnos, 'cotutela');
    const labels = Object.keys(cotutelaCounts);
    const data = Object.values(cotutelaCounts);

    this.cotutelaChart = new Chart(this.cotutelaCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de estudiantes',
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

  crearGraficoNacionalidad() {
    const nacionalidadCounts = this.contarValores(this.alumnos, 'nacionalidad');
    const labels = Object.keys(nacionalidadCounts);
    const data = Object.values(nacionalidadCounts);

    this.nacionalidadChart = new Chart(this.nacionalidadCanvas.nativeElement, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de alumnos por Nacionalidad',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        // Configuración opcional de las opciones del gráfico
      }
    });
  }

  contarValores(arr: any[], attribute: string): { [key: string]: number } {
    return arr.reduce((counts, item) => {
      const value = item[attribute];
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});
  }
}