# 📱 ReVístete App – Versión 3.0

**ReVístete** es una aplicación híbrida desarrollada en **Ionic + Angular**, orientada a fomentar la economía circular mediante la compraventa de ropa usada. Esta nueva versión consolida su funcionamiento multiplataforma y lista para publicación en Android, incluyendo mejoras en experiencia, seguridad, y validación de calidad.

---

## 🚩 Problemática detectada

Muchas personas acumulan prendas en buen estado que ya no usan, mientras otras buscan opciones más económicas y sustentables para renovar su ropa. Falta una plataforma móvil, confiable y fácil de usar que resuelva esta necesidad de forma eficiente.

---

## 💡 Solución propuesta

Una app móvil accesible que permite publicar, buscar y adquirir ropa usada. ReVístete crea una comunidad de moda consciente que promueve el intercambio responsable.

---

## ✨ Novedades en la versión 3.0

- ✔️ **Generación de APK y AAB firmados para Android**
- ✔️ **Formulario de validación para publicación**
- ✔️ **Firma con certificado digital (`.jks`) mediante Keytool**
- ✔️ **Configuración multiplataforma (Android, iOS, WebMobile)**
- ✔️ **Pruebas unitarias con Jasmine y E2E con Cypress**
- ✔️ **Validación visual de checklist previo a publicación**

---

## 🎨 Interfaces y componentes utilizados

- **Ionic Framework:** `ion-toggle`, `ion-input`, `ion-menu`, `ion-card`
- **Angular Material:** `mat-form-field`, `mat-radio-button`, `mat-button`
- **Formularios reactivos:** Validación completa en `ReactiveForms`
- **Capacitor Plugins:** `Camera`, `Preferences`
- **SQLite + ngx-sqlite-porter:** Para persistencia offline

---

## 🧩 Funcionalidades implementadas

- 🔐 **Registro/login persistente** conectado a API REST con SQLite como respaldo offline.
- 🧥 **Publicación de prendas:** con fotos desde la cámara y detalles como talla, estado, precio.
- 💬 **Comentarios por prenda** visibles para todos los usuarios autenticados.
- 🎛️ **Filtros por categoría, género, talla y estado.**
- ⚠️ **Manejo de errores HTTP y offline.**
- 📝 **Formulario de validación** con verificación visual de requisitos técnicos antes de subir la app.

---

## 🧪 Pruebas

- ✅ **Pruebas Unitarias (Jasmine + Karma):**
  - Validación de formularios, lógica de componentes.
- ✅ **Pruebas E2E (Cypress):**
  - Flujo completo desde login → publicación → comentarios → logout.
- Todas las pruebas fueron exitosas y están documentadas.

---

## 🚀 Publicación Android (sin publicar)

- 🔐 Certificado generado con `keytool` (`revistete-key.jks`)
- ✅ APK alineado y firmado (`ReVistete.apk`)
- ✅ Bundle AAB generado y firmado (`ReVistete.aab`)
- 📄 Configuración detallada en `capacitor.config.ts` y `config.xml`
- 🧾 Página `/validacion-publicacion` creada para verificación previa a publicación

---

## 🛠️ Tecnologías utilizadas

- Ionic Framework  
- Angular  
- Capacitor  
- TypeScript  
- SQLite  
- FastAPI  
- Jasmine / Cypress  
- HTML + SCSS

---

## 🧾 Versión y Firma Android

```xml
<!-- Fragmento relevante de config.xml -->
<widget id="com.revistete.app" version="1.0.0">
  <platform name="android">
    <preference name="android-versionCode" value="1" />
  </platform>
</widget>
```

- **versionName:** `1.0.0`   
- **versionCode:** `1`

---

## 🔐 Firma y Keystore

- **Archivo Keystore:** `revistete-key.jks`  
- **Alias:** `revistete`

### ✍️ Firma con jarsigner:

```bash
# Firmar APK manualmente
jarsigner -verbose -keystore revistete-key.jks -signedjar ReVistete-signed.apk ReVistete-unaligned.apk revistete

# Verificar firma
jarsigner -verify -verbose -certs ReVistete-signed.apk
```

> ⚠️ **Importante:** este keystore debe mantenerse seguro. Todas las futuras versiones de la app **deben** ser firmadas con el mismo archivo `.jks`.

---

## ✏️ Autora

**Romina Torres** ✨  
`ro.torresg@duocuc.cl`

---

¡Gracias por visitar mi proyecto!