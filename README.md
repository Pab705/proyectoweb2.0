# "Sistema de Reportes para Programa Doctorado de Escuela de Informática de la PUCV"
**INF3240 - Ingeniería Web**<br />
**Escuela de Ingeniería Informática**<br />
**Pontificia Universidad Católica de Valparaíso**

<!-- omit in toc -->
## Índice
<!--  -->
1. [Información General](#información-general)
2. [Tecnologías utilizadas](#tecnologías-utilizadas)
3. [Archivos](#archivos)
4. [Instrucciones de instalación](#instrucciones-de-instalación)
5. [Mockups en Figma](#mockups-en-figma)
6. [Funcionalidades](#funcionalidades)

## Novedades

- Se ha implementado el backend usando Django y una base de datos Sqlite. El propósito del backend es traer la data de los archivos excel alojados en la carpeta de drive para llenar las tablas y el archivo JSON, el cual será devuelto al frontend ante una http request en data.service.ts 

- El sistema lee y trae información a las tablas en los diferentes componentes desde archivos JSON de forma dinámica (Actualmente está con archivos de prueba y datos ficticios).

- Relacionado a lo anterior, utilizando de forma modular los servicios y métodos; el sistema puede buscar alumnos por rut y/o nombre, desplegando los resultados en un componente aparte.

- En todas las tablas en las que se despliegan los alumnos, es posible acceder al perfil de cada uno, pudiendo desplegar dinámicamente cada opción del submenú del perfil de alumno (Perfil, publicaciones, becas, pasantías y eventos) y muestra la información contenida en cada una.

- La rapidez del sistema es notable, cada operación es inmediata (0,1s), tanto la navegación entre los distintos componentes del sistema como la búsqueda y manejo de los datos de los archivos JSON de forma dinámica. Por lo que cualquier factor que aumente el tiempo de carga del sistema tendrá que ver únicamente con el servidor,  velocidades de internet, entre otros. Todo esto es gracias a que se optó por utilizar buenas prácticas de modularización de métodos, como también por aprovechar el framework de Angular puro para utilizar únicamente funcionalidades, tales como reactive forms.

- En cuánto a apariencia, el sistema es casi idéntico a los mockups, se conservaron tanto la disposición de la información como la disposición de los elementos. De hecho, se mejoró un leve aspecto y es que el navbar con los módulos de navegación está escondido, es desplegable y no ocupa espacio necesario para visualizar la información.

- Siguiendo la línea del cómo se ve el sistema, es importante señalar que es completamente responsivo.

- El código está documentado en todos los servicios y casi todos los componentes, facilitando así el mantenimiento.

-  Ahora se cuenta con seguridad implementada con angular reactive forms, que maneja el inicio de sesión, prohíbe el acceso a usuarios no autorizados a los componentes del sistema (Por ejemplo, mediante el url) y cuenta con un único usuario estático modificable (Por rut y contraseña). 


## Información general


- **INF3240 - Ingeniería Web**<br />
- **Escuela de Ingeniería Informática**<br />
- **Pontificia Universidad Católica de Valparaíso**
- **Temática:** Visualización de datos
- **Autor:** Patricio Ahumada Bonilla rut: 18.758.163-K
- **Objetivo del proyecto:** El proyecto constará de un visualizador de información y estadísticas relevantes para el proceso de autoevaluación de postgrados, en el cual se examinan críticamente diferentes factores del programa (En este caso, de doctorados), para así poder destacar sus fortalezas y debilidades. El sistema recopilará y graficará el cruce de diversas fuentes de información manejada por el área docente y administrativa de la escuela; y mostrará las estadísticas requeridas por dichas áreas para facilitar así el desarrollo del informe de autoevaluación.

## Tecnologías utilizadas

- [![bootstrap-badge]][bootstrap-web]
- ![Angular CLI](https://img.shields.io/badge/Angular_CLI-16.2-brightgreen)

## Archivos

| Título             | Tipo       | Archivo (link)                     |
| ------------------ | --------   | ---------------------------------- |
| Proyecto-web       |Repositorio de GitHub|https://github.com/Pab705/proyectoweb2.0      |

## Instrucciones de instalación

1. Descargar el archivo `Proyectoweb2.0-master.zip` desde el repositorio de GitHub.
2. Descomprimir el archivo, de preferencia en el escritorio.
3. Abrir la carpeta `Proyecto-web-master` en Visual Studio Code.
4. Presionar las teclas <kbd>Ctrl</kbd> + <kbd>ñ</kbd> para abrir la terminal integrada de Visual Studio Code (también puede acceder presionando <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>p</kbd>, y escribiendo `terminal`).
5. Instalar las dependencias de NPM con el comando:
    ```bash
    npm install
    ```
6. Ejecutar el proyecto con el comando:
    ```bash
    ng serve
    ```
7. Credenciales para inicio de sesión
 ```
      Usuario: 18.758.163-K
      Contraseña: contrasena
```
## Mockups en figma

Archivo (link)
   : https://www.figma.com/file/QpQEfX8d213tAWWk1nEoym/Untitled?type=design&mode=design&t=eODBBcDeqkMkEXvM-1

## Funcionalidades


### Inicio de sesión

  El primer módulo tiene la funcionalidad de validar los datos ingresados en los campos de RUT y Contraseña. Bajo estos campos encontramos el botón de inicio de sesión, el cual nos redirigirá a la primer interface de visualización de datos del programa, "Resumen".
  El sistema cuenta con un AuthGuard en cada componente de este, tan solo ingresando con las credenciales se podrá visualizar el contenido de la página y sus componentes. Además, se validará que el rut esté en el formato requerido.

### Resumen por periodo

  En este modulo encontraremos información relevante sobre los alumnos que cursan o cursaron el programa de doctorados en el periodo seleccionado en el grupo de botones (últimos 10 años, últimos 5 años, último año y semestre actual). Además, podremos visualizar 
algunos gráficos generales de relevancia a modo de resumen presupuestario e información sociológica de los alumnos matriculados. También podremos visualizar el estado de acreditación actual de la escuela.
  Tendremos además un botón (Bajo el logo) que despliega un menú para acceder a los distintos módulos del programa.
  Al costado derecho del logo de la escuela, encontraremos una barra de búsqueda de alumnos por nombre/apellido o rut.
  Al seleccionar un alumno, se redirigirá al componente de perfil.
 
### Recursos

  En el módulo Recursos, podremos visualizar información graficada relevante a montos invertidos por la escuela, asignaciones directas a alumnos para concepto de becas, pasantías y eventos

### Estadísticas

  En el presente módulo de Estadísticas, visualizaremos la graficación de todo el cruce de información relevante al proceso de autoevaluación del programa de doctorado, tanto demográfica como económica.

### Comunidad

  En el módulo de comunidad, veremos una lista de los estudiantes participando del programa en el periodo seleccionado, además de una barra de progreso que otorga información rápida al lector sobre el semestre que está cursando el alumno, (Muestra la etiqueta "EXTENDIDO" si el alumno prolongó su estadía en el programa sobre los 8 semestres), estado de avance del alumno y los hitos más importantes del programa (Examen de candidatura y examen de grado). Estas barras cambiarán de color según el estado actual del alumno (VERDE si cursa normalmente el programa o si fue aprobado; AMARILLO si el alumno se encuentra en una interrupción de estudios o cursa el último semestre permitido por el programa {Máximo 12}; y ROJA si el alumno se retiró del programa o reprobó)

### Perfil de alumno

  En el perfil de alumno, se muestra información general de este, también una barra de progreso en el programa junto a destacadores de los hitos: Inicio en el programa, Examen de candidatura, interrupción de estudios (Si existe) y examen de grado. Al igual que las barras de progreso presentes en el módulo de comunidad, estas cambiarán de color según el estado actual del alumno. 
  Además, encontraremos una barra de navegación con las siguientes categorías de información:
  
  - Perfil
  - Publicaciones: Información sobre la cantidad de publicaciones realizadas por el alumno.
  - Pasantías: Responsable en lugar de origen y destino, lugar de destino y gráficos con información sobre recursos asignados.
  - Becas: Institución que otorga el beneficio, semestres en que se perciben y totales de recursos asignados, junto con gráficos correspondientes.
  - Eventos: Información relevante sobre los eventos a los que ha asistido el alumno, generalmente charlas.



[AngularCLI]: https://angular.io/cli
[bootstrap-badge]: https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff&style=flat
[bootstrap-web]: https://getbootstrap.com/
