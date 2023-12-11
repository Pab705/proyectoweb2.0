import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit{
  alumno: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const alumnoId = +idParam;
        this.dataService.getAlumnoPorId(alumnoId).subscribe(alumno => {
          this.alumno = alumno;
          console.log("Alumno: ", this.alumno);
        });
      }
    });
  }
}
