# Supermercado – Sistema de Gestión de Inventario

Aplicación web desarrollada con **React y Vite** para la administración de inventario de un supermercado. Permite registrar artículos, consultar existencias, controlar el stock y gestionar los productos mediante una interfaz moderna y adaptable.

El proyecto utiliza un backend desarrollado con **Node.js y Express**, encargado de administrar los datos y mantener la persistencia de los productos en un archivo JSON.

---

## Información del proyecto

| Característica | Descripción |
|---|---|
| Proyecto | Sistema de Gestión de Inventario |
| Módulo | Desarrollo Frontend II |
| Semana | Semana 2 |
| Frontend | React 19 |
| Herramienta de desarrollo | Vite 8 |
| Estilos | Tailwind CSS 4 |
| Navegación | React Router DOM |
| Backend | Node.js + Express |
| Persistencia | Archivo JSON |
| Lenguaje | JavaScript |

## Objetivo

Desarrollar una aplicación web que permita gestionar el inventario de un supermercado, aplicando conceptos de desarrollo frontend, componentes reutilizables, navegación entre páginas, administración de estado global e integración con un servicio backend.

## Funcionalidades principales

### 1. Inicio
- Presentación general del sistema.
- Visualización de la cantidad de productos registrados.
- Consulta del total de unidades disponibles.
- Identificación de productos con stock bajo.
- Acceso directo a las principales funcionalidades.

### 2. Agregar artículos
- Registro de nuevos productos.
- Ingreso de nombre, marca, tipo y stock.
- Validación de los datos del formulario.
- Control de registros duplicados.
- Actualización del inventario después de guardar un artículo.

### 3. Inventario
- Visualización de los productos registrados.
- Consulta de nombre, marca, tipo y existencias.
- Búsqueda y filtrado de productos.
- Identificación de artículos con stock bajo.
- Descuento de unidades disponibles.
- Eliminación de productos.

### 4. Quiénes somos
Página informativa que presenta el propósito del sistema y sus principales compromisos.

### 5. Preguntas frecuentes
Sección de ayuda que explica el funcionamiento general de la aplicación y el almacenamiento de los productos.

### 6. Página de error 404
Vista de error para las rutas que no existen, con una opción para regresar al inicio.

## Arquitectura del proyecto

El proyecto está dividido en dos partes principales:

- **Frontend:** aplicación React encargada de la interfaz, navegación y administración del estado.
- **Backend:** servicio Express que proporciona los endpoints para consultar y modificar los productos.

La comunicación entre ambas partes se realiza mediante solicitudes HTTP utilizando la API REST.

## Estructura de carpetas

```text
supermercado/
│
├── server/
│   ├── data/
│   │   └── productos.json
│   │
│   └── server.js
│
├── src/
│   ├── componentes/
│   │   ├── MenuInferior.jsx
│   │   └── MenuInventario.jsx
│   │
│   ├── context/
│   │   ├── InventarioContext.js
│   │   ├── InventarioProvider.jsx
│   │   └── useInventario.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AgregarArticulo.jsx
│   │   ├── Inventario.jsx
│   │   ├── QuienesSomos.jsx
│   │   ├── PreguntasFrecuentes.jsx
│   │   └── NotFound.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

> Nota: si se eliminó `App.css` después de migrar todos los estilos a Tailwind CSS, debe omitirse de esta estructura.

## Tecnologías utilizadas

| Tecnología | Utilización |
|---|---|
| React 19 | Construcción de interfaces mediante componentes. |
| Vite 8 | Servidor de desarrollo y compilación. |
| Tailwind CSS 4 | Diseño y estilos de la interfaz. |
| React Router DOM 7 | Navegación entre páginas. |
| Node.js | Entorno de ejecución del backend. |
| Express 5 | Creación de la API REST. |
| JavaScript | Lógica de la aplicación. |
| JSON | Almacenamiento de los productos. |

## Requisitos previos

Antes de ejecutar el proyecto, se necesita tener instalado:

- Node.js.
- NPM.
- Git (opcional, para clonar el repositorio).

Se recomienda utilizar una versión de Node.js compatible con las dependencias del proyecto.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta:

```bash
cd supermercado
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el backend

Abrir una primera terminal dentro de la carpeta del proyecto y ejecutar:

```bash
npm run serve
```

El servidor Express quedará disponible en:

```text
http://localhost:3000
```

### 4. Iniciar el frontend

Abrir una segunda terminal, también dentro de la carpeta del proyecto, y ejecutar:

```bash
npm run dev
```

Vite mostrará la dirección local de la aplicación. Normalmente:

```text
http://localhost:5173
```

**Importante:** el backend y el frontend deben permanecer ejecutándose en terminales separadas para que la aplicación pueda comunicarse correctamente con la API.

## API REST

El backend proporciona los siguientes endpoints:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Obtiene todos los productos. |
| POST | `/api/productos` | Registra un nuevo producto. |
| PATCH | `/api/productos/:id/descontar` | Descuenta unidades del stock. |
| DELETE | `/api/productos/:id` | Elimina un producto. |

### Persistencia de datos

Los productos se almacenan en:

```text
server/data/productos.json
```

El backend utiliza este archivo para guardar los registros y conservar los cambios realizados en el inventario entre ejecuciones del servidor.

No se utilizan productos codificados directamente en la interfaz como mecanismo de persistencia.

## Administración del estado global

La aplicación utiliza **React Context API** para compartir la información del inventario entre los distintos componentes y páginas.

El contexto permite centralizar las operaciones principales:

- Obtener los productos.
- Agregar artículos.
- Descontar unidades del stock.
- Eliminar productos.
- Actualizar la información del inventario.

De esta manera, las distintas páginas trabajan con una fuente de información compartida, evitando duplicar la lógica de administración de productos.

## Diseño de la interfaz

La interfaz está desarrollada utilizando Tailwind CSS 4.

Se incorporan los siguientes criterios de diseño:

- Estilo visual moderno y minimalista.
- Paleta de colores basada en tonos verdes.
- Componentes reutilizables.
- Distribución adaptable a diferentes tamaños de pantalla.
- Navegación clara entre las secciones.
- Indicadores visuales para el estado del inventario.

## Validación del proyecto

Para revisar el código y comprobar que la aplicación puede compilarse correctamente, ejecutar:

### Análisis de código

```bash
npm run lint
```

### Compilación de producción

```bash
npm run build
```

Si ambos comandos finalizan correctamente, se habrá comprobado el análisis estático del código y la generación de la versión de producción.

## Aprendizajes aplicados

Durante el desarrollo se trabajaron los siguientes conceptos:

- Desarrollo de interfaces utilizando React.
- Creación y reutilización de componentes.
- Administración del estado mediante Context API.
- Implementación de rutas con React Router DOM.
- Aplicación de estilos utilizando Tailwind CSS.
- Integración de frontend con backend mediante API REST.
- Validación de formularios.
- Persistencia de información mediante archivos JSON.
- Organización de un proyecto frontend y backend.
- Control de versiones mediante Git.

## Autor

**Egor Llancapichun**

Proyecto académico desarrollado como parte del módulo **Desarrollo Frontend II**.

---

*Sistema de Gestión de Inventario – Supermercado*  
*Desarrollo Frontend II | Semana 2*