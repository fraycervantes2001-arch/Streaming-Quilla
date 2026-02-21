
const MY_PHONE = "573023083344"; // TU NUMERO DE WHATSAPP CON CODIGO DE PAIS PERO SIN EL SIGNO + NI ESPACIOS

// ===== BOTONES PEDIR AHORA =====
function sendWhatsApp(product) {

    const message = `Hola 👋 quiero adquirir el plan *${product}*.
¿Me confirmas disponibilidad?`;

    const url = `https://wa.me/${MY_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}


