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
  alumno:any[]=[];
  alumnosFiltrados: any[] = [];
  private alumnosFiltradosSubscription?: Subscription;

  constructor (private dataService:DataService, private router:Router){}

  redirigirAPerfil(id: number) {
    this.router.navigate(['/perfil', id]); // Ajusta la ruta según tu enrutamiento
  }

  ngOnInit() {
    /*this.dataService.getData().subscribe((result)=> {
      this.alumno=result;
    });*/
    this.dataService.filtrarPorPeriodo('semestreActual'); // Filtrar por este semestre por defecto
    this.alumnosFiltradosSubscription = this.dataService.alumnosFiltrados$.subscribe(
      (alumnosFiltrados) => {
        this.alumnosFiltrados = alumnosFiltrados;
      }
    );
  }

  ngOnDestroy() {
    if (this.alumnosFiltradosSubscription) {
      this.alumnosFiltradosSubscription.unsubscribe();
    }
  }

}
