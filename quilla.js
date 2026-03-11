const MY_PHONE = "573023083344";

let cart = [];
let deferredPrompt = null;
let currentFilter = "all";
let currentSearch = "";

const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
}

function sendWhatsApp(tipo, detalle = "") {
    let message = `Hola 👋 estoy interesado en ${tipo}`;

    if (detalle !== "") {
        message += ` - ${detalle}`;
    }

    message += `.\n¿Me brindas más información?`;

    const url = `https://wa.me/${MY_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
    showToast(`${name} agregado al carrito`);

    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
        cartIcon.classList.add("vibrate");
        setTimeout(() => {
            cartIcon.classList.remove("vibrate");
        }, 300);
    }
}

function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!container || !cartCount || !totalElement) return;

    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <span>${item.name}</span>
                    <div class="controls">
                        <button onclick="decrease(${index})">➖</button>
                        <span>${item.quantity}</span>
                        <button onclick="increase(${index})">➕</button>
                    </div>
                </div>
                <span>$${(item.price * item.quantity).toLocaleString("es-CO")}</span>
            </div>
        `;
    });

    totalElement.innerText = total.toLocaleString("es-CO");
    localStorage.setItem("cart", JSON.stringify(cart));
}

function increase(index) {
    cart[index].quantity++;
    updateCart();
}

function decrease(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
    showToast("Carrito vaciado");
}

function toggleCart() {
    const cartPanel = document.getElementById("cart-panel");
    const overlay = document.getElementById("overlay");

    if (cartPanel) cartPanel.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
}

function cerrarcart() {
    const cartPanel = document.getElementById("cart-panel");
    const overlay = document.getElementById("overlay");

    if (cartPanel) cartPanel.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
}

function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    const ahora = new Date();
    const fecha = ahora.toLocaleDateString("es-CO");
    const hora = ahora.toLocaleTimeString("es-CO");
    const numeroPedido = "SQ" + Math.floor(100000 + Math.random() * 900000);

    let total = 0;
    let message = "";

    message += "━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += "🎬 *STREAMING QUILLA* 🎬\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

    message += `🧾 Pedido: ${numeroPedido}\n`;
    message += `📅 Fecha: ${fecha}\n`;
    message += `⏰ Hora: ${hora}\n\n`;

    message += "🛒 DETALLE DEL PEDIDO\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━\n";

    cart.forEach(item => {
        total += item.price * item.quantity;
        message += `• ${item.name}\n`;
        message += `   Cantidad: ${item.quantity}\n`;
        message += `   Subtotal: $${(item.price * item.quantity).toLocaleString("es-CO")}\n\n`;
    });

    message += "━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += `💰 *TOTAL A PAGAR: $${total.toLocaleString("es-CO")}*\n`;
    message += "━━━━━━━━━━━━━━━━━━━━━━━━\n";
    message += "💳 *MEDIOS DE PAGO DISPONIBLES*\n";
    message += "━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

    message += "Bancolombia\n";
    message += "Nequi\n";
    message += "Daviplata\n\n";

    message += "Por favor confirma cuál prefieres utilizar ✅\n";
    message += "Luego envía el comprobante de pago para activar tu servicio 🚀";

    const url = `https://wa.me/${MY_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    cart = [];
    updateCart();
    cerrarcart();
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function toggleFavorite(button) {
    button.classList.toggle("active");
}

function closePromo() {
    const promo = document.getElementById("promo-banner");
    if (promo) promo.style.display = "none";
}

window.addEventListener("scroll", () => {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    if (window.scrollY > 400) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function setActiveFilterButton(filter) {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.classList.remove("active-filter");
        if (btn.dataset.filter === filter) {
            btn.classList.add("active-filter");
        }
    });
}

function applyFilters() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const cardCategory = (card.getAttribute("data-category") || "").toLowerCase();
        const cardText = card.innerText.toLowerCase();

        const matchesFilter = currentFilter === "all" || cardCategory.includes(currentFilter);
        const matchesSearch = cardText.includes(currentSearch);

        card.style.display = matchesFilter && matchesSearch ? "flex" : "none";
    });

    updateVisibleCounter();
}

function filterCards(category) {
    currentFilter = category;
    setActiveFilterButton(category);
    applyFilters();
}

function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {
        currentSearch = searchInput.value.toLowerCase().trim();
        applyFilters();
    });
}

function setupSort() {
    const sortSelect = document.getElementById("sortSelect");
    const catalogo = document.querySelector(".catalogo");

    if (!sortSelect || !catalogo) return;

    sortSelect.addEventListener("change", () => {
        const cards = Array.from(catalogo.querySelectorAll(".card"));

        if (!sortSelect.value) return;

        cards.sort((a, b) => {
            const priceA = parseInt(a.querySelector(".precio").innerText.replace(/\D/g, ""));
            const priceB = parseInt(b.querySelector(".precio").innerText.replace(/\D/g, ""));

            return sortSelect.value === "asc" ? priceA - priceB : priceB - priceA;
        });

        cards.forEach(card => catalogo.appendChild(card));
        applyFilters();
    });
}

function updateProductCounter() {
    const cards = document.querySelectorAll(".card");
    const counter = document.getElementById("product-counter");
    if (counter) {
        counter.innerText = `Tenemos ${cards.length} servicios disponibles`;
    }
}

function updateVisibleCounter() {
    const cards = document.querySelectorAll(".catalogo .card");
    const visibleCards = [...cards].filter(card => card.style.display !== "none");
    const counter = document.getElementById("product-counter");

    if (counter) {
        counter.innerText = `Mostrando ${visibleCards.length} de ${cards.length} servicios disponibles`;
    }
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then(reg => console.log("Service Worker registrado", reg))
            .catch(err => console.log("Error SW", err));
    });
}

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.getElementById("installBtn");
    if (!installBtn) return;

    installBtn.style.display = "block";

    installBtn.addEventListener("click", async () => {
        installBtn.style.display = "none";

        if (deferredPrompt) {
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            deferredPrompt = null;
        }
    }, { once: true });
});

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    body.style.opacity = 0;
    body.style.transform = "scale(1.02)";
    body.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
        body.style.opacity = 1;
        body.style.transform = "scale(1)";
    }, 100);

    updateCart();
    updateProductCounter();
    setupSearch();
    setupSort();
    applyFilters();
});

window.addEventListener("load", () => {
    setTimeout(() => {
        const intro = document.getElementById("intro");
        if (intro) {
            intro.style.display = "none";
        }
    }, 2500);
});
