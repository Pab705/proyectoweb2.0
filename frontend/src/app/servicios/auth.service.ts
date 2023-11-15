import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Declaración de las propiedades username y password
  private static readonly validUsername = '18.758.163-k';
  private static readonly validUsernameWithK = '18.758.163-K'; // Agregamos RUT con "K" mayúscula
  private static readonly validPassword = 'contrasena';

  constructor() {
    // Inicializa el estado de autenticación al cargar la aplicación
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
    if (isUserLoggedIn === 'true'){
      this.isAuthenticatedSubject.next(true);
    }
    //this.isAuthenticatedSubject.next(this.checkAuthentication());
  }

  // Función para realizar la autenticación (por ejemplo, en el inicio de sesión)
  login(username: string, password: string): Observable<boolean> {

    // Lógica de autenticación (consulta a un servidor, verifica credenciales, etc.)
    // Si la autenticación es exitosa, establece el estado de autenticación en `true`

    if (username === AuthService.validUsername && password === AuthService.validPassword){
      this.isAuthenticatedSubject.next(true);   // Autenticación exitosa
      localStorage.setItem('isUserLoggedIn','true');  //Guarda estado de la sesión
      return of(true);
    }else if(username === AuthService.validUsernameWithK && password === AuthService.validPassword){
      this.isAuthenticatedSubject.next(true);  //Autenticación exitosa
      localStorage.setItem('isUserLoggedIn','true');
      return of(true);
    }else {
      return of(false);  // Auntenticación fallida
    }
  }

  // Función para cerrar sesión
  logout(): void {
    // Realiza las tareas necesarias para cerrar la sesión (por ejemplo, limpiar tokens, etc.)
    // Establece el estado de autenticación en `false`
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isUserLoggedIn');
  }

  isAuthenticated():boolean{
    return this.isAuthenticatedSubject.value;
  }

  // Verifica si el usuario está autenticado (puedes personalizar esto según tus necesidades)
  private checkAuthentication(): boolean {
    // Implementa la lógica para verificar si el usuario está autenticado
    // Por ejemplo, verifica si hay un token válido en el almacenamiento local
    // Devuelve `true` si el usuario está autenticado, de lo contrario, `false`
    return false;
  }

  /*
   // Función para realizar la autenticación con un servidor backend
   login(username: string, password: string): Observable<boolean> {
    // Simula una solicitud al servidor para verificar las credenciales
    return this.verifyCredentialsWithServer(username, password);
  }

  // Función para verificar las credenciales con un servidor backend
  private verifyCredentialsWithServer(username: string, password: string): Observable<boolean> {
    // Aquí deberías realizar una solicitud HTTP al servidor backend
    // para verificar las credenciales del usuario.
    // Si las credenciales son válidas, el servidor debe devolver una respuesta
    // que indique que la autenticación fue exitosa.
    // En este ejemplo, simulamos una respuesta exitosa.

    // Simula una respuesta exitosa del servidor
    const isAuthenticated = true;
    this.isAuthenticatedSubject.next(isAuthenticated);
    return of(isAuthenticated);
  }
  */

}
