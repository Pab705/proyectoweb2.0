import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-becas',
  templateUrl: './becas.component.html',
  styleUrls: ['./becas.component.scss']
})
export class BecasComponent implements OnInit {
  becas: any[] = [];
  alumnoId: number | undefined;
  totalRecursos: number = 0;


  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.alumnoId = +idParam;
        this.dataService.getBecasPorIdAlumno(this.alumnoId).subscribe(becas => {
          this.becas = becas;
          console.log("Becas del alumno:", this.becas);
          this.totalRecursos = this.calcularTotalRecursos();
        });
      }
    });
  }

  calcularTotalRecursos(): number {
    // Sumar los recursos asignados de todas las becas
    return this.becas.reduce((total, beca) => {
      // Remover el símbolo de dólar y los puntos separadores
      const valorLimpio = beca.recursosAsignados.replace(/\$|\.|,/g, '');
      // Convertir el valor limpio a número y sumarlo al total
      return total + parseFloat(valorLimpio);
    }, 0);
  }

  formatearNumero(numero: number): string {
    // Formatear el número con separadores de miles
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

