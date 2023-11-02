import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.scss']
})
export class PerfilAlumnoComponent implements OnInit{

  alumno: any; // Usar 'alumno' en lugar de 'alumnoId'

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const alumnoId = +idParam;
        this.dataService.getAlumnoPorId(alumnoId).subscribe(alumno => {
          this.alumno = alumno;
        });
      }
    });
  }
}