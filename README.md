# Cami & Agus — Invitación digital

Invitación web estática, adaptable a celulares, tablets y computadoras. No requiere instalación, servidor propio ni dependencias de JavaScript.

## Archivos
- `index.html`: estructura y contenido de la invitación.
- `styles.css`: identidad visual, diseño responsive y animaciones.
- `script.js`: configuración de WhatsApp, fecha/hora, cuenta regresiva, Google Maps y lista editable de regalos.
- `favicon.svg`: ícono de la página.

## Personalizar antes de publicar

Abrí `script.js` y editá el objeto `CONFIG` al comienzo:

### WhatsApp
Reemplazá `whatsappNumber: ""` por el número de Cami o Agus en formato internacional, sin `+`, espacios ni guiones. Para Argentina, normalmente comienza con `549` seguido del código de área y número. Ejemplo ficticio de formato: `549XXXXXXXXXX`.

Mientras esté vacío, el botón abre WhatsApp con el mensaje listo para enviar, pero no dirige a un número específico.

### Hora de la celebración
`eventDate` está configurado inicialmente para el comienzo del sábado 3/4/2027 en Argentina (UTC-3). Cuando sepan el horario, cambialo conservando el formato ISO y el sufijo `-03:00`, por ejemplo `2027-04-03T19:30:00-03:00`.

### Regalos de Mercado Libre
Dentro de `gifts`, agregá un objeto por producto, usando únicamente enlaces e imágenes reales:

```js
{
  name: "Nombre del producto",
  description: "Descripción breve.",
  price: "$ 00.000",
  image: "https://...imagen-real...",
  url: "https://www.mercadolibre.com.ar/..."
}
```

Podés omitir `price` o `image`. Para quitar un regalo, eliminá su objeto. Si el arreglo queda vacío, la página muestra un mensaje de lista en preparación.

## Publicar gratis con Netlify
1. Entrá a https://app.netlify.com/drop
2. Descomprimí el ZIP en tu computadora.
3. Arrastrá la carpeta `cami-agus-invitacion` (la que contiene `index.html`) a la zona de carga.
4. Netlify publicará la página y te dará una URL pública `https://...netlify.app`.
5. Para actualizarla, editá los archivos y volvé a arrastrar la carpeta a la página de deploy del mismo sitio.

También podés usar Vercel: https://vercel.com/new, importando el proyecto desde un repositorio Git.

## Antes de compartir
- Configurá el número de WhatsApp.
- Confirmá el horario para ajustar la cuenta regresiva.
- Incorporá los productos y enlaces reales cuando tengan la lista.
- Abrí el enlace en Safari y Chrome desde un celular y probá los botones.

## Notas
- Google Maps usa una búsqueda directa con la dirección exacta indicada, sin coordenadas inventadas.
- La imagen de portada/fondo es una fotografía remota de Unsplash; requiere conexión a Internet. Podés cambiar la URL en `index.html` y `styles.css` por una foto propia optimizada.
- El texto bíblico de Colosenses 3:14 está atribuido a Reina-Valera 1960. Eclesiastés 4:9 se cita como referencia breve.
- El contador llega a las 00:00 de Argentina mientras no se defina la hora del evento.
