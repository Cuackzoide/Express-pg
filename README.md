# 🚀 Programming Courses API (Express + PostgreSQL)

## 📋 Descripción

Esta es una API RESTful diseñada para servir información estructurada sobre cursos de programación. 
El proyecto demuestra la integración fluida entre una base de datos relacional (**PostgreSQL**) y un servidor de aplicaciones (**Node.js**), 
transformando datos crudos en recursos **JSON** listos para ser consumidos por cualquier cliente Frontend.

🌐 **Demo en vivo:** [https://express-pg.onrender.com/](https://express-pg.onrender.com/)

---

## 🛠️ Tecnologías Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework Web:** [Express.js](https://expressjs.com/)
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
- **Driver de BD:** `pg` (node-postgres)
- **Despliegue:** Render (Web Service) + Neon (Data Base)

---

## ⚙️ Características Técnicas

- **Arquitectura Cliente-Servidor:** Separación clara entre el almacenamiento de datos y la lógica de entrega.
- **Consultas SQL:** Implementación de queries para la recuperación de datos desde tablas relacionales.
- **Parseo de Datos:** Conversión automática de tipos de datos SQL a objetos JSON.
- **Manejo de CORS:** Configurada para permitir el acceso desde aplicaciones externas.

---

## 📂 Estructura del Proyecto

- `index.js` (o `app.js`): Punto de entrada del servidor y configuración de Express.
- `db.js`: Configuración de la conexión y pool de PostgreSQL.
- `routes/`: Definición de los endpoints de la API.

---

## 🚀 Instalación y Uso Local

Si deseas ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**
  ```bash
   git clone [https://github.com/Cuackzoide/nombre-del-repo.git](https://github.com/Cuackzoide/nombre-del-repo.git)
   cd nombre-del-repo
   ```
2. Instalar dependencias (Recomendado usar pnpm):

```bash
pnpm install
```
3. Configurar variables de entorno:
Crea un archivo .env con tus credenciales de PostgreSQL:
```text
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_bd
```

4. Iniciar el servidor:
```bash
pnpm start
```
🎯 Endpoints Disponibles
|      |                       |                  | 
|:-----|:----------------------|:-----------------|
|GET / | Da mensaje de bienvenida | "Welcome to courses API" |
|GET /api/cursos | Retorna la lista completa de cursos disponibles en la base de datos. | todos |
|GET /api/cursos/:tipo | Retorna el detalle por tipo de curso | programacion o matematicas |
|GET /api/cursos/:tipo/:tema | Retorna el detalle por tema | javascript y python ó calculo y algebra |

💡 Aprendizajes Clave
Este proyecto fue fundamental para dominar:
- La configuración de Pool de conexiones para optimizar el rendimiento de la base de datos.
- El flujo de datos asíncrono en Node.js mediante async/await.
- El despliegue de bases de datos relacionales en la nube.

Desarrollado por **Oliver Barra** inspirado en el curso de [FreeCodeCamp](https://www.youtube.com/watch?v=1hpc70_OoAg) 
