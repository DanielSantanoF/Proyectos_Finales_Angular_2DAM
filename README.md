# Proyectos Finales Angular 2ºDAM
Proyectos finales de [Angular](https://angular.io/ "Angular.io") de las asignuaturas:
* Desarrollo de Interfaces
* Programación Multimedia y Dispositivos Móviles 

Son dos proyectos:
* El primer proyecto trata sobre la gestión de sustituciones de profesores cuando un profesor falta y es necesario asignarle un profesor sustituto que este en disposición ese día de la semana a esa hora, consta de un calendario interactivo, y de un generador de pdf que genera un pdf con todas las sustituciones del dia en formato tabla.
* El segundo proyecto es más simple trata de gestionar una lista de turnos en dudas durante una clase, el profesor 

***

#### Datos para acceder a la aplicación:

##### Se hace inicio de sesiñon con cuenta de Google
Al iniciar sesión en la aplicación con google se registran algunos datos en la base de datos de firebase para que se genere tu usuario

***

#### Tecnologías usadas:
* [Angular](https://angular.io/ "Angular.io")
* [Firebase](https://firebase.google.com/?hl=es-419 "Firebase de Google")
* [TypeScript](https://www.typescriptlang.org/ "TypeScript.org")
* [npm](https://www.npmjs.com/)
* IDE: [Visual Studio Code](https://code.visualstudio.com/) necesario para arrancar la aplicación (se debe arrancar desde el IDE)

***


## Librerías a instalar

### ANGULAR MATERIAL
    npm install -g @angular/cli
    ng add @angular/material

### FLEX LAYOUT
    npm i -s @angular/flex-layout @angular/cdk

### Firebase
    npm install @angular/fire firebase --save

### Libreria para generar el pdf
#### Necesaria para el proyecto de gestión de sustituciones
    npm install --save pdfmake

## Usar la aplicación de Angular

* Debereas tener un proyecto de firebase y una aplicación con una base de datos de firebase para poder usar la aplicación, revisa la documentación de firebase de [Install and Setup](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md "Instalación y setup de firebase") para más información
* Ejecuta el comando `ng serve` en el terminal de VSC. Arranca la aplicación en `http://localhost:4200/`. La aplicación recargara automaticamente cualquier cambio en el código de la misma.
* El primer proyecto de gestión de sustituciones esta disponible en el servicio de hosting de firebase => [Ver aplicación](https://pfagestionsustituciones.firebaseapp.com/session/signin "proyecto de gestión de profesores")


## Ayuda en el uso de firebase

* Revisa su documentación [Firebase Doc](https://firebase.google.com/docs?hl=es-419 "Firebase github doc")

## Ayuda en el uso de Angular CLI

* Ejecuta en el terminal de VSC `ng help` o revisa esta documentación [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
