import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardarService {

  

  resultadosSubject: Subject<any[]> = new Subject<any[]>();
  results: any[]=[];

  setResultadoBusqueda(results: any[]) {
    this.results = results;
    this.resultadosSubject.next(results); // Notificar a los suscriptores sobre nuevos resultados
    console.log("Servicio guardar ejecutado correctamente con los siguientes datos:",results);
  }

  getResultadoBusqueda(){
    console.log("método del servicio guardar ejecutado correctamente con los siguientes datos",this.results);
    return this.results;
  }

  constructor() { }
}