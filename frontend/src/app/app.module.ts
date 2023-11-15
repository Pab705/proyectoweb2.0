import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './servicios/data.service';
import { GuardarService } from './servicios/guardar.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { PerfilAlumnoComponent } from './componentes/perfil-alumno/perfil-alumno.component';
import { IndicadoresComponent } from './componentes/indicadores/indicadores.component';
import { RecursosComponent } from './componentes/recursos/recursos.component';
import { ComunidadComponent } from './componentes/comunidad/comunidad.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { PerfilComponent } from './componentes/perfil-alumno/perfil/perfil.component';
import { PublicacionesComponent } from './componentes/perfil-alumno/publicaciones/publicaciones.component';
import { PasantiasComponent } from './componentes/perfil-alumno/pasantias/pasantias.component';
import { BecasComponent } from './componentes/perfil-alumno/becas/becas.component';
import { EventosComponent } from './componentes/perfil-alumno/eventos/eventos.component';
import { FormsModule } from '@angular/forms';
import { ResultadoBusquedaComponent } from './componentes/resultado-busqueda/resultado-busqueda.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthService } from './servicios/auth.service';
import { AuthGuard } from './auth.guard';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PerfilAlumnoComponent,
    IndicadoresComponent,
    RecursosComponent,
    ComunidadComponent,
    NavbarComponent,
    ResumenComponent,
    PerfilComponent,
    PublicacionesComponent,
    PasantiasComponent,
    BecasComponent,
    EventosComponent,
    ResultadoBusquedaComponent,
    LoginComponent,
    CommonLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService,GuardarService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
