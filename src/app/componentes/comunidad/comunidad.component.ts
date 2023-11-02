import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss']
})
export class ComunidadComponent implements OnInit{
  alumno:any[]=[];

  constructor (private dataService:DataService, private router:Router){}

  redirigirAPerfil(id: number) {
    this.router.navigate(['/perfil', id]); // Ajusta la ruta según tu enrutamiento
  }

  ngOnInit() {
    this.dataService.getData().subscribe((result)=> {
      this.alumno=result;
    });
  }

}
