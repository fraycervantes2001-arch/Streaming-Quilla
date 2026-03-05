const MY_PHONE = "573023083344";

let cart = [];



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

    if (!container) return;

    cartCount.innerText = cart.length;
    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>

                <div class="controls">
                    <button onclick="decrease(${index})">➖</button>
                    <span>${item.quantity}</span>
                    <button onclick="increase(${index})">➕</button>
                </div>

                <span>$${(item.price * item.quantity).toLocaleString("es-CO")}</span>
            </div>
        `;
    });

    totalElement.innerText = total.toLocaleString("es-CO");
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
}



function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
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
   message += "        🎬 *STREAMING QUILLA* 🎬\n";
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
}
