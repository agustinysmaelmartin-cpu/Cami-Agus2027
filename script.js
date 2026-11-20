/* CONFIGURACIÓN: editá estos valores para personalizar la invitación. */
const CONFIG = {
  // Formato internacional sin + ni espacios. Ejemplo: 549XXXXXXXXXX
  whatsappNumber: "",
  whatsappMessage: "Hola Cami y Agus. ¡Confirmo mi asistencia a su boda del 3 de abril de 2027!",
  // Hora local de Argentina. Reemplazá 00:00 si ya conocen el horario de inicio.
  eventDate: "2027-04-03T00:00:00-03:00",
  mapsAddress: "Espacio Los Colibríes, Calle Bernabé Garro 151, barrio Los Talas, Anisacate, Córdoba, Argentina",
  // Agregá regalos reales cuando tengan sus enlaces. No se muestran productos de ejemplo.
  gifts: [
    // { name: "Nombre del regalo", description: "Descripción breve.", price: "$ 00.000", image: "URL_DE_IMAGEN", url: "https://www.mercadolibre.com.ar/..." }
  ]
};

const intro = document.getElementById("intro");
const site = document.getElementById("site");
const openButton = document.getElementById("openInvitation");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

openButton.addEventListener("click", () => {
  intro.classList.add("is-hidden");
  site.classList.add("is-open");
  site.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "";
  window.setTimeout(() => document.getElementById("story").scrollIntoView({behavior: reduceMotion ? "auto" : "smooth"}), 220);
});
document.body.style.overflow = "hidden";

const maps = document.getElementById("mapsLink");
maps.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.mapsAddress);

const whatsapp = document.getElementById("whatsappLink");
function configureWhatsApp() {
  if (CONFIG.whatsappNumber.trim()) {
    const number = CONFIG.whatsappNumber.replace(/\D/g, "");
    whatsapp.href = `https://wa.me/${number}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
    whatsapp.removeAttribute("aria-disabled");
  } else {
    whatsapp.href = "https://wa.me/?text=" + encodeURIComponent(CONFIG.whatsappMessage);
    whatsapp.title = "Configurá el número de WhatsApp en script.js para dirigir la confirmación a Cami y Agus.";
  }
}
configureWhatsApp();

function updateCountdown() {
  // El instante incluye el offset UTC-3 para que el contador use siempre la hora argentina.
  const target = new Date(CONFIG.eventDate).getTime();
  const remaining = Math.max(0, target - Date.now());
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

const giftGrid = document.getElementById("giftGrid");
const giftPlaceholder = document.getElementById("giftPlaceholder");
if (CONFIG.gifts.length) {
  giftPlaceholder.hidden = true;
  CONFIG.gifts.forEach((gift) => {
    const card = document.createElement("article");
    card.className = "gift-card";
    const image = document.createElement("img");
    image.src = gift.image || "";
    image.alt = gift.name || "Regalo para el hogar";
    image.loading = "lazy";
    const content = document.createElement("div");
    content.className = "gift-card-content";
    const title = document.createElement("h3"); title.textContent = gift.name;
    const desc = document.createElement("p"); desc.textContent = gift.description || "";
    content.append(title, desc);
    if (gift.price) { const price = document.createElement("div"); price.className = "gift-price"; price.textContent = gift.price; content.append(price); }
    const link = document.createElement("a"); link.href = gift.url; link.target = "_blank"; link.rel = "noopener"; link.textContent = "Ver regalo ↗";
    content.append(link); card.append(image, content); giftGrid.append(card);
  });
}

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.14});
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}
