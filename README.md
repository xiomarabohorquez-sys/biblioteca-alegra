# Biblioteca Alegra

Página web interactiva con el catálogo de libros y recursos de Alegra. Los libros se guardan en una hoja de Google Sheets y cualquier persona del equipo puede recomendar uno nuevo directamente desde la página.

Oficialmente hosteada en GitHub Pages: `https://<tu-usuario>.github.io/biblioteca-alegra/`

## Archivos

- `index.html` — la página completa (diseño, catálogo, buscador, filtros por idioma, exploración por categorías y formulario). No necesita instalación ni servidor.
- `code.gs` — backend gratuito en Google Apps Script que guarda y lee los libros en Google Sheets.

## 1) Conectar la hoja de Google (una sola vez)

1. Crea una hoja de cálculo nueva en [Google Sheets](https://sheets.google.com/new).
2. En el menú: **Extensiones > Apps Script**.
3. Borra el contenido del editor y pega todo el contenido de `code.gs`.
4. Pulsa **Implementar > Nueva implementación**:
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo** (tu cuenta)
   - Quién tiene acceso: **Cualquier persona**
5. Copia la URL generada (termina en `/exec`).
6. Abre `index.html`, localiza esta línea al inicio del `<script>`:

   ```js
   var WEB_APP_URL = "";
   ```

   y pégala ahí:

   ```js
   var WEB_APP_URL = "https://script.google.com/macros/s/TU_ID/exec";
   ```

7. Guarda el archivo y vuelve a **Implementar > Nueva implementación** para publicar el cambio.
8. Recuerda: cada vez que modifiques `code.gs` debes volver a crear una implementación nueva para que los cambios se reflejen.

Cuando una persona envía un libro, se agrega una fila a la hoja en las columnas:
`ID | Nombre | Autor | Link | Idioma | Recomendado por | Fecha`

## 2) Subir la página a GitHub

### Opción A: desde terminal (git)

```bash
cd "ruta/al/carpeta/biblioteca-alegra"
git init
git add index.html code.gs README.md
git commit -m "Primera versión de la Biblioteca Alegra"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/biblioteca-alegra.git
git push -u origin main
```

> Si el repositorio ya existe y tiene cambios, usa `git pull origin main --rebase` antes del `push`.

### Opción B: desde GitHub

1. Entra a [github.com/new](https://github.com/new) y crea un repositorio llamado `biblioteca-alegra` (público o privado, tú decides).
2. Arrastra los archivos `index.html`, `code.gs` y `README.md` hasta la vista "Uploading..." que aparece tras crear el repo.
3. Pulsa **Commit changes**.

### Activar GitHub Pages

1. En tu repositorio, ve a **Settings > Pages**.
2. En *Build and deployment*, selecciona la rama **main** y carpeta **/(root)**.
3. Pulsa **Save**. Espera 1-2 minutos.
4. Tu biblioteca quedará en: `https://TU_USUARIO.github.io/biblioteca-alegra/`

## Actualizar el catálogo

- Los libros del catálogo base están en `index.html`, dentro de `CATALOGO_INICIAL`. Para agregar o quitar uno, edita ese array y guarda (se actualiza al subir el archivo a GitHub).
- Cada libro incluye un campo `categoria` (ej: `"Ventas y Marketing"`, `"Datos y Analítica"`). Para cambiarla, edita el valor y guarda. La página muestra primero las categorías como botones; al hacer clic se despliegan sus libros. Los libros sin `categoria` aparecen bajo **"Sin categoría"**.
- Los libros enviados por las personas quedan en la hoja de Google y aparecen automáticamente en la página, sin volver a tocar GitHub.