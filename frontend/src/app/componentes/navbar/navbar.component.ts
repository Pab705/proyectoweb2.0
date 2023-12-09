import { Component } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private dataService: DataService) {}

  mostrarButtonGroup(): boolean {
    return this.dataService.getNavbarButtonGroupVisibility();
  }

  filtrarPorPeriodo(periodo: string) {
    this.dataService.filtrarPorPeriodo(periodo);
 
      // Utiliza los datos filtrados (alumnosFiltrados) para mostrar en la tabla u otra operación necesaria
      // this.alumnos = alumnosFiltrados; // Por ejemplo, asignar a una variable para mostrar en la tabla
  };
}

