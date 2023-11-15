import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardarService } from 'src/app/servicios/guardar.service';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.scss']
})
export class ResultadoBusquedaComponent implements OnInit{

  resultados: any[]=[];

  constructor(private router:Router,private guardarService:GuardarService){}

  ngOnInit() {
    // Suscribirse al servicio para obtener los resultados cuando estén disponibles
    this.guardarService.resultadosSubject.subscribe((results) => {
      this.resultados = results;
      console.log('datos cargados en servicio', this.resultados);
    });
  }

  volver() {
    // Navegar de nuevo al contenido de otros componentes
    this.router.navigate(['/resumen']);
    //Limpiar los resultados al volver
    this.guardarService.setResultadoBusqueda([]);
  }
  redirigirAPerfil(id: number) {
    this.router.navigate(['/perfil', id]); // Ajusta la ruta según enrutamiento
  }

}
