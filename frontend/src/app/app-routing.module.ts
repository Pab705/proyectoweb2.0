import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicadoresComponent } from './componentes/indicadores/indicadores.component';
import { RecursosComponent } from './componentes/recursos/recursos.component';
import { ComunidadComponent } from './componentes/comunidad/comunidad.component';
import { PerfilAlumnoComponent } from './componentes/perfil-alumno/perfil-alumno.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { PerfilComponent } from './componentes/perfil-alumno/perfil/perfil.component';
import { PublicacionesComponent } from './componentes/perfil-alumno/publicaciones/publicaciones.component';
import { PasantiasComponent } from './componentes/perfil-alumno/pasantias/pasantias.component';
import { BecasComponent } from './componentes/perfil-alumno/becas/becas.component';
import { EventosComponent } from './componentes/perfil-alumno/eventos/eventos.component';
import { ResultadoBusquedaComponent } from './componentes/resultado-busqueda/resultado-busqueda.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './auth.guard';
import { CommonLayoutComponent } from './common-layout/common-layout.component';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
    path:'',
    component:CommonLayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'resumen',
        component:ResumenComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'resultadoBusqueda',
        component:ResultadoBusquedaComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'recursos',
        component:RecursosComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'indicadores',
        component:IndicadoresComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'comunidad',
        component:ComunidadComponent,
        canActivate:[AuthGuard]
      },
      {
        path:`perfil/:id`, component:PerfilAlumnoComponent,canActivate:[AuthGuard],
          children:[
            {path:"perfilA",component:PerfilComponent,canActivate:[AuthGuard]},
            {path:"publicaciones", component:PublicacionesComponent,canActivate:[AuthGuard]},
            {path:"pasantias", component:PasantiasComponent,canActivate:[AuthGuard]},
            {path:"becas", component:BecasComponent,canActivate:[AuthGuard]},
            {path:"eventos", component:EventosComponent,canActivate:[AuthGuard]}    
            ]
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
