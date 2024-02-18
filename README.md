# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


1. Para iniciar el proyecto es necesario hacer:
yarn install --> instalar node modules y las dependencias necesarias
yarn dev --> para abrir la app en entorno de desarrollo
yarn build --> para building
yarn preview --> para ver el build creado
2. Comandos para los test:
yarn test --> lanza todos los test 
yarn report --> para lanzar los test y escribir los resultados en el archivo
/reports/reports.json.

En principio con estos comandos deberia ser suficiente para la correccion de la evaluable.
Un punto a aclarar, vite esta configurado para abrir una pagina en el navegador predeterminado con la url de desarrollo que este proporciona con yarn dev. Si NO se desea esta funcionalidad:

Entrar en vite.config.js y borrar server{open:true}

--He tenido que eliminar del package.json el apartado "type": "modules" para poder realizar los test, en caso de notar algun error en la ejecucion del programa por este motivo, sera necesario ponerlo justo debajo de la version: 0.0.0, lanzar yarn install y luego quitar "type":"modules" para poder lanzar los tests.