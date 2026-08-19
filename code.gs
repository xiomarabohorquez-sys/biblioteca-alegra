/**
 * Biblioteca Alegra - Backend en Google Sheets
 *
 * Cómo usarlo:
 * 1. Crea una hoja de cálculo nueva en Google Sheets.
 * 2. Menú: Extensiones > Apps Script.
 * 3. Borra el contenido del editor y pega este archivo completo (code.gs).
 * 4. Pulsa "Implementar" > "Nueva implementación".
 *    - Tipo: Aplicación web
 *    - Ejecutar como: "Yo" (tu cuenta)
 *    - Acceso: "Cualquier persona"
 * 5. Copia la URL que termina en /exec y pégala en index.html en:
 *    var WEB_APP_URL = "TU_URL_AQUI";
 * 6. Guarda, vuelve a publicar (nueva implementación) y listo.
 *
 * La hoja guarda una fila por libro con las columnas:
 * ID | Nombre | Autor | Link | Idioma | Recomendado por | Fecha
 */

var HOJA = "Libros";

function doGet() {
  var hoja = obtenerHoja_();
  var filas = hoja.getDataRange().getValues();
  var libros = [];
  for (var i = 1; i < filas.length; i++) {
    var f = filas[i];
    if (!f[1]) continue;
    libros.push({
      nombre: f[1],
      autor: f[2],
      link: f[3],
      idioma: f[4],
      recomendadoPor: f[5],
      fecha: f[6],
    });
  }
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, libros: libros })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var datos = JSON.parse(e.postData.contents);
  var hoja = obtenerHoja_();
  hoja.appendRow([
    hoja.getLastRow(),
    datos.nombre || "",
    datos.autor || "",
    datos.link || "",
    datos.idioma || "",
    datos.recomendadoPor || "",
    new Date().toISOString(),
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function obtenerHoja_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(HOJA);
  if (!hoja) {
    hoja = ss.insertSheet(HOJA);
    hoja.appendRow([
      "ID",
      "Nombre",
      "Autor",
      "Link",
      "Idioma",
      "Recomendado por",
      "Fecha",
    ]);
  }
  return hoja;
}
