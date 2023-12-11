import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-pasantias',
  templateUrl: './pasantias.component.html',
  styleUrls: ['./pasantias.component.scss']
})
export class PasantiasComponent implements OnInit{
  pasantiasData:any[] = [];
  alumnoId!: number;
  alumnoPasantias: any[] = [];

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.alumnoId = +params['id'];
      this.cargarPasantiasPorAlumno(this.alumnoId);
    });
  }

  cargarPasantiasPorAlumno(id: number): void {
    this.dataService.getPasantiasPorAlumno(id).subscribe({
      next: (pasantias) => {
        console.log("Todas las pasantías: ",pasantias);
        this.alumnoPasantias = pasantias.filter((pasantia) => pasantia.idAlumno === id);
        console.log("Id variable: ",id,"id alumno: ",this.alumnoId,"id pasantia: ", this.alumnoPasantias);
      },
      error: (error) => {
        console.error('Error al cargar pasantías:', error);
      }
    });
  }  
}
