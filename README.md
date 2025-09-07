# 📋 Form Web Component

Un formulario **multi-step** construido en **React + TypeScript**, estilizado con **TailwindCSS** y exportado como **Web Component**, para poder integrarlo en cualquier aplicación o página HTML sin depender de React directamente.

El formulario está pensado para gestionar datos de un **alojamiento (Accommodation)** y su **propietario (Owner)**, con validaciones basadas en **Zod**, integración opcional con **Google Places Autocomplete**, y feedback al enviar.

---

## ✨ Features

- ⚛️ **React + TypeScript + Vite** como base.
- 🎨 **TailwindCSS** para estilos.
- 🧩 **UI Components reutilizables** (`InputUI`, `ButtonUI`, `ModalUI`, `TextElementUI`).
- 📍 **Soporte opcional de Google Places API** para autocompletar direcciones.
- 🧾 **Validaciones con Zod**, errores en blur y botón _Next_ deshabilitado hasta cumplir requisitos.
- 🔌 Exportado como **Custom Element** (`<custom-react-form>`) listo para usar en cualquier HTML.
- 🎲 **Feedback aleatorio de éxito o error** después de enviar el formulario.
- 🔄 **Reset automático** tras envío exitoso.

---

## 🏗️ Tech Stack

- [React](https://react.dev/) 19 + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) – validación de esquemas
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) (opcional para direcciones)

---

## 📦 Instalación y desarrollo

Cloná el repo e instalá dependencias:

```bash
npm i
```

Ejecutá en modo desarrollo:

```html
npm run dev
```

Build de producción (genera el Web Component en dist/):

```html
npm run build
```

Vista previa del build:

npm run preview

🔌 Uso como Web Component

Tras el build, en la carpeta dist/ tendrás los archivos listos (custom-react-form.js, style.css).

Podés abrir el HTML directamente con doble click o usar Live Server para probarlo.

Ejemplo de integración en un index.html:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Form Web Component</title>
    <script
      type="module"
      src="../form-web-component/dist/custom-react-form.js"
    ></script>
  </head>
  <body>
    <script>
      const form = document.createElement("custom-react-form");
      // form.setAttribute("maps-key", "API KEY HERE"); // opcional
      form.setAttribute("country", "ES");

      form.addEventListener("custom-react-submit", (e) => {
        console.log("Data enviada:", e.detail);
      });

      document.body.appendChild(form);
    </script>
  </body>
</html>
```

⚙️ Props / Atributos del Web Component

maps-key (opcional): API Key de Google Maps (habilitar Maps JavaScript API y Places API en Google Cloud).

country (opcional): restringe el autocompletado a un país (ej: "AR", "ES").

👉 Si no se pasa maps-key, el campo Address funciona como input normal.

Ejemplo sin key (fallback):

<custom-react-form country="ES"></custom-react-form>

```text
🗂️ Estructura de carpetas
src/
├─ components/        # UI genéricos: InputUI, ButtonUI, ModalUI, TextElementUI
├─ steps/             # Steps del formulario (Accommodation, Owner, Summary)
├─ validation/        # Schemas de Zod y helpers
├─ styles/            # Tailwind global.css
├─ types/             # Tipados de datos (Accommodation, Owner)
├─ App.tsx            # Modo app standalone
├─ custom-element.tsx # Exportación como Web Component
└─ main.tsx           # Entry point Vite
```

🧪 Tests

El proyecto incluye setup para Vitest (jsdom) para testear componentes y validaciones:

npm run test

🚀 Próximos pasos / Mejoras

Migrar Autocomplete clásico → <gmpx-place-autocomplete> (recomendado por Google a partir de 2025).

Agregar más steps configurables dinámicamente.

Internacionalización (i18n) de labels y mensajes de error.

Soporte a tema oscuro/claro en el Web Component.

🌍 Cómo habilitar Google Maps API y Places API

Para probar el autocompletado de direcciones, necesitás una Google Maps API Key válida.

Entrá a Google Cloud Console
.

Crea un proyecto nuevo (o usa uno existente).

En el menú, andá a APIs & Services > Library.

Habilitá Maps JavaScript API.

Habilitá Places API.

Andá a APIs & Services > Credentials y crea una API Key.

Restringí la clave:

En Application restrictions, elegí HTTP referrers y agregá http://localhost:\* y/o el dominio donde vayas a probar.

En API restrictions, permití solo Maps JavaScript API y Places API.

Copiá la API Key y pasala al Web Component con el atributo maps-key.

Ejemplo:

```html
<custom-react-form maps-key="TU_API_KEY" country="ES"></custom-react-form>
```
