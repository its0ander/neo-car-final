document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateQuantity(productId, newQty);
  //   getPriceByName(name);
  showPaymentPopup();
  hidePaymentPopup();
});

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemsList = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");

  itemsList.innerHTML = "";

  let total = 0;

  // Группируем товары по ID
  const grouped = {};
  cart.forEach((item) => {
    if (!grouped[item.id]) {
      grouped[item.id] = { ...item, quantity: 0 };
    }
    grouped[item.id].quantity += 1;
  });

  // Выводим каждый товар
  for (let key in grouped) {
    const item = grouped[key];
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} — ${item.price} ₽ x 
      <input type="number" value="${
        item.quantity
      }" min="1" onchange="updateQuantity('${item.id}', this.value)">
      = <strong>${item.price * item.quantity} ₽</strong>
    `;
    itemsList.appendChild(li);
  }

  totalPriceEl.textContent = total;
}

function updateQuantity(productId, newQty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = [];

  // Пересобираем корзину
  cart.forEach((item) => {
    if (item.id === productId) {
      for (let i = 0; i < parseInt(newQty); i++) {
        updatedCart.push(item);
      }
    } else {
      updatedCart.push(item);
    }
  });

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  loadCart();
}

function showPaymentPopup() {
  document.getElementById("paymentPopup").classList.remove("hidden");
}

function hidePaymentPopup() {
  document.getElementById("paymentPopup").classList.add("hidden");
}

window.onload = function () {
  loadCart();
};
