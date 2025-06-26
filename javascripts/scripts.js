document.addEventListener("DOMContentLoaded", () => {
  showBurgerMenu();
  clicker();
  // addToCart(product);
  // updateCartUI();
  // addToCart(product);
  // closeModal();
  // updateCartIndicator();
  addToCart(productId);
  updateCartIndicator();
  closeModal();
});

function showBurgerMenu() {
  document.querySelector("#burger").addEventListener("click", () => {
    document.querySelector("#burger").classList.toggle("active");
  });
}

// function clicker() {
//   const swiper = new Swiper(".swiper", {
//     // Optional parameters
//     direction: "horizontal", // или 'vertical'
//     loop: true,

//     // Navigation arrows
//     navigation: {
//       nextEl: ".custom-next-btn",
//       prevEl: ".custom-prev-btn",
//     },

//     // Pagination
//     pagination: {
//       el: ".swiper-pagination",
//     },
//   });
// }

function clicker() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,

    navigation: {
      nextEl: ".custom-next-btn",
      prevEl: ".custom-prev-btn",
    },

    // Анимация при изменении слайда
    on: {
      slideChange: function () {
        // Можно добавить дополнительные эффекты здесь
      },
    },
  });
}

const products = {
  "concert-a": {
    id: "concert-a",
    name: "Билет на концерт «Взрослый»",
    price: 2500,
  },
  "concert-b": {
    id: "concert-b",
    name: "Билет на концерт «Детский»",
    price: 500,
  },
  "vip-ticket": { id: "vip-ticket", name: "Канцелярский набор", price: 590 },
};

function addToCart(productId) {
  const product = products[productId];
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Добавляем товар
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartIndicator();

  // Показываем модальное окно
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function updateCartIndicator() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cartCount");
  countEl.textContent = cart.length;
}

// При загрузке обновляем состояние корзины
window.onload = function () {
  updateCartIndicator();
};
