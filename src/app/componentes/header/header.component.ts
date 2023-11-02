import { Component } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { Router } from '@angular/router';
import { GuardarService } from 'src/app/servicios/guardar.service';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';
  alumnos: any[] = [];

  constructor(private dataService: DataService,private router:Router, private guardarService:GuardarService,private authService:AuthService) {}

  search() {
    this.alumnos=[]; //Limpia los resultados antes de una nueva búsqueda

    this.dataService.buscarAlumnos(this.searchQuery).subscribe((results) => {
      this.alumnos = results;

      this.guardarService.setResultadoBusqueda(results);
      console.log('método buscar llamado',results)
    });
  }

  irAresultados(){
    this.router.navigate(['/resultadoBusqueda']);
  }

  redirigirAPerfil(id: number) {
    this.router.navigate(['/perfil', id]); // Ajusta la ruta según enrutamiento
  }

  logout(): void {
    this.authService.logout(); // Llamamos al método logout del servicio
    this.router.navigate(['/login']); // Redirigimos al componente de inicio de sesión
  }

}
