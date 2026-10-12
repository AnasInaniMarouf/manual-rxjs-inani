# Manual RxJs - Anas Inani Marouf

//---//

## Necesario antes de empezar

1. Node.js.
2. Visual Studio Code o cualquier otro editor.

//---//

## Instalarlo paso por paso

Abre el terminal pon los siguientes comandos:

1. Creae el proyecto:
   npm init -y

2. Instalar RxJS:
   npm install rxjs

3. Instalar Vite:
   npm install vite --save-dev

4. Cosas importantes en el package.json:
   Hay que sustituir lo que haya por:
   "type": "module"

5. Crear un archivo vite.config.js en la carpeta principal con esto adentro:

   import { defineConfig } from 'vite';

   export default defineConfig({
     root: 'ejemplo',
   });

//---//

## Ejecutar la interfaz en el navegador

- Escribe este comando en la terminal:
   npx vite

- Te saldrá un enlace (como en mi caso "http://localhost:5173/").
- Cópialo, pégalo en tu navegador y ya

//---//

©AnasInaniMarouf
