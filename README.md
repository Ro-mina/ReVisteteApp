📱 ReVístete App – Versión 2.0

ReVístete es una aplicación móvil híbrida desarrollada en Ionic y Angular, enfocada en la economía circular, que facilita la compra, venta e intercambio de prendas usadas en excelente estado. Su objetivo es fomentar la moda sustentable mediante una plataforma funcional, accesible y segura.

---

🚩 Problemática detectada

Muchas personas tienen ropa en buen estado que ya no utilizan, mientras otras buscan alternativas económicas y sostenibles para renovar su guardarropa. Actualmente, no todas cuentan con una plataforma confiable, accesible y fácil para resolver esta necesidad.

---

💡 Solución propuesta

La aplicación móvil ReVístete conecta a los usuarios de forma eficiente, permitiéndoles publicar, buscar y adquirir prendas en buen estado. Esta nueva versión mejora significativamente la seguridad, la experiencia de uso, y la capacidad de funcionar sin conexión.

---

✨ Ventajas de la versión 2.0:

- Plataforma intuitiva, con navegación protegida mediante Route Guards.
- Funciona offline gracias a persistencia de datos con SQLite.
- Promueve el consumo consciente y sostenible.
- Permite subir fotos desde la cámara del dispositivo (Capacitor Camera).
- Diseño atractivo, validaciones visuales y animaciones que enriquecen la experiencia.

⚠️ Desafíos:

- Requiere una comunidad activa para mantener contenido actualizado.
- Necesita moderación continua para asegurar la calidad del contenido.

---

🎨 Interfaces y componentes utilizados

- **Ionic Framework:** `ion-card`, `ion-button`, `ion-select`, `ion-menu`, `ion-header`, `ion-footer`.
- **Angular Material:** Formularios con `mat-form-field`, `mat-select`, `mat-datepicker`.
- **Reactive Forms:** Validaciones robustas y control avanzado de formularios.
- **Plugins:** `@capacitor/camera`, `@capacitor/preferences`, `SQLite`, `ngx-sqlite-porter`.

---

⚙️ Funciones principales desarrolladas

- 🔐 **Autenticación persistente:** Registro e inicio de sesión conectados a API REST (FastAPI), con almacenamiento local del usuario.
- 🧥 **Publicación de prendas con cámara:** Toma directa de fotos con el celular y publicación inmediata.
- 🔍 **Filtros dinámicos:** Por tipo de prenda, estado, talla y ubicación.
- 💬 **Sistema de comentarios:** Vinculados a cada prenda, con persistencia y sincronización.
- 🔄 **Visualización offline:** Si no hay conexión, la app muestra los datos guardados previamente con SQLite.
- ⚠️ **Manejo de errores HTTP:** Incluyendo fallback en errores como 404 o pérdida de red.
- 🎯 **Navegación optimizada:** Rutas protegidas, fluidez en la experiencia y estructura modular.

---

🛠️ Desarrollado con

- Ionic Framework  
- Angular  
- Angular Material  
- TypeScript  
- SQLite  
- FastAPI (Backend)  
- HTML & SCSS  

---

✏️ Autor  
[Ro-mina]  
¡Gracias por visitar mi proyecto! ✨