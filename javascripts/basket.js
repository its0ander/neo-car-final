document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateQuantity(productId, newQty);
  showPaymentPopup();
  hidePaymentPopup();
  createBasketItemElement();
  createBasketItem();
  addToBasket();
  updateBasketItem();
  addToCart();
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
      ${item.name} 

  

      <input type="number" value="${
        item.quantity
      }" min="1" onchange="updateQuantity('${item.id}', this.value)">
      <strong>${item.price * item.quantity} ₽</strong>
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
// Новая функция создания элемента корзины
function createBasketItemElement(item) {
  const li = document.createElement("li");
  li.className = "basket-item"; // Базовый класс

  // Добавляем кастомные data-атрибуты
  li.dataset.productId = item.id;
  li.dataset.category = item.category;

  li.innerHTML = `
    <div class="basket-item-content">
      <span class="basket-item-name">${item.name}</span>
      <span class="basket-item-price">${item.price} руб.</span>
      <div class="basket-item-controls">
        <button class="quantity-decrease">-</button>
        <span class="item-quantity">${item.quantity}</span>
        <button class="quantity-increase">+</button>
        <button class="remove-item">Удалить</button>
      </div>
    </div>
  `;

  return li;
}

// Новая функция создания элемента корзины
function createBasketItem(item) {
  const li = document.createElement("li");
  li.className = "basket-item";
  li.dataset.id = item.id;
  li.dataset.category = item.category || "other";

  li.innerHTML = `
    <div class="basket-item__main">
      <img src="${item.image || "img/default-product.jpg"}" 
           alt="${item.name}" 
           class="basket-item__image">
      <div class="basket-item__info">
        <h3 class="basket-item__title">${item.name}</h3>
        <p class="basket-item__description">${item.description || ""}</p>
      </div>
    </div>
    <div class="basket-item__controls">
      <div class="quantity-control">
        <button class="quantity-btn minus">−</button>
        <span class="quantity">${item.quantity}</span>
        <button class="quantity-btn plus">+</button>
      </div>
      <div class="price-block">
        <span class="price">${item.price} ₽</span>
        <button class="remove-btn">
          <img src="img/trash-icon.svg" alt="Удалить">
        </button>
      </div>
    </div>
  `;

  return li;
}

// Обновляем функцию добавления в корзину
function addToBasket(product) {
  // ... существующий код поиска товара в корзине

  if (existingItem) {
    existingItem.quantity += 1;
    // Обновляем конкретный элемент
    updateBasketItem(existingItem);
  } else {
    const newItem = { ...product, quantity: 1 };
    basketItems.push(newItem);
    const itemElement = createBasketItem(newItem);
    document.getElementById("basket-items").appendChild(itemElement);
  }

  updateTotal();
}
// Делегирование событий для кнопок
document.getElementById("basket-items").addEventListener("click", (e) => {
  const itemElement = e.target.closest(".basket-item");
  if (!itemElement) return;

  const itemId = itemElement.dataset.id;
  const item = basketItems.find((item) => item.id == itemId);

  if (e.target.classList.contains("plus")) {
    item.quantity += 1;
    updateBasketItem(item);
  } else if (e.target.classList.contains("minus")) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      updateBasketItem(item);
    }
  } else if (e.target.closest(".remove-btn")) {
    removeFromBasket(item.id);
  }

  updateTotal();
});

// Функция обновления элемента
function updateBasketItem(item) {
  const itemElement = document.querySelector(
    `.basket-item[data-id="${item.id}"]`
  );
  if (itemElement) {
    itemElement.querySelector(".quantity").textContent = item.quantity;
    itemElement.classList.add("highlight");
    setTimeout(() => itemElement.classList.remove("highlight"), 1500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let basketItems = JSON.parse(localStorage.getItem("basket")) || [];

  // Инициализация корзины
  function initBasket() {
    renderBasket();
    updateTotal();
  }

  // Рендер всех товаров
  function renderBasket() {
    const basketList = document.getElementById("basket-items");
    basketList.innerHTML = "";

    basketItems.forEach((item) => {
      basketList.appendChild(createBasketItem(item));
    });
  }

  // Создание элемента товара
  function createBasketItem(item) {
    const li = document.createElement("li");
    li.className = "basket-item";
    li.dataset.id = item.id;

    li.innerHTML = `
      <div class="basket-item__main">
        <img src="${item.image || "img/default.jpg"}" 
             alt="${item.name}" 
             class="basket-item__image">
        <div class="basket-item__info">
          <h3 class="basket-item__title">${item.name}</h3>
          ${
            item.description
              ? `<p class="basket-item__description">${item.description}</p>`
              : ""
          }
        </div>
      </div>
      <div class="basket-item__controls">
        <div class="quantity-control">
          <button class="quantity-btn minus">−</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus">+</button>
        </div>
        <div class="price-block">
          <span class="price">${item.price * item.quantity} ₽</span>
          <button class="remove-btn">Удалить</button>
        </div>
      </div>
    `;

    return li;
  }

  // Обновление итоговой суммы
  function updateTotal() {
    const total = basketItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    document.getElementById("basket-total").textContent = total;
    localStorage.setItem("basket", JSON.stringify(basketItems));
  }

  // Обработчики событий
  document
    .getElementById("basket-items")
    .addEventListener("click", function (e) {
      const itemElement = e.target.closest(".basket-item");
      if (!itemElement) return;

      const itemId = parseInt(itemElement.dataset.id);
      const item = basketItems.find((item) => item.id === itemId);

      if (e.target.classList.contains("plus")) {
        item.quantity += 1;
      } else if (e.target.classList.contains("minus")) {
        item.quantity = Math.max(1, item.quantity - 1);
      } else if (e.target.classList.contains("remove-btn")) {
        basketItems = basketItems.filter((i) => i.id !== itemId);
      }

      renderBasket();
      updateTotal();
    });

  // Инициализация
  initBasket();
});
