import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];
  totalRecursos: number = 0;
  idAlumno!: number;

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.idAlumno = +params['id'];
      this.dataService.getEventos(this.idAlumno).subscribe((eventos: any[]) => {
        this.eventos = eventos;
        this.totalRecursos = this.calcularTotalRecursos();
      });
    });
  }

  calcularTotalRecursos(): number {
    return this.eventos.reduce((total, evento) => {
      const valorLimpio = evento.recursosAsignados.replace(/\$|\.|,/g, '');
      return total + parseFloat(valorLimpio);
    }, 0);
  }

  formatearNumero(numero: number): string {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

