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
    slidesPerView: 1,
    centeredSlides: true, // Добавляем центровку
    spaceBetween: 20,
    loop: true,

    navigation: {
      nextEl: ".custom-next-btn",
      prevEl: ".custom-prev-btn",
    },

    breakpoints: {
      600: {
        slidesPerView: 3,
        centeredSlides: true, // Центрируем и в десктопном режиме
        initialSlide: 1, // Начинаем со второго слайда (чтобы первый был по центру)
        spaceBetween: 30,
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

// Инициализация Swiper для десктопной версии
// document.addEventListener("DOMContentLoaded", function () {
//   if (window.innerWidth > 600) {
//     const desktopSwiper = new Swiper(".desktop-slider", {
//       slidesPerView: 3,
//       spaceBetween: 20,
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },
//       loop: true,
//       autoplay: {
//         delay: 3000,
//         disableOnInteraction: false,
//       },
//     });
//   }

// Логика для мобильного слайдера
// if (window.innerWidth <= 600) {
//   const slides = document.querySelectorAll(".mobile-slide");
//   const prevBtn = document.querySelector(".mobile-prev");
//   const nextBtn = document.querySelector(".mobile-next");
//   let currentIndex = 0;

//   function showSlide(index) {
//     slides.forEach((slide, i) => {
//       slide.classList.toggle("active", i === index);
//     });
//   }

//   function nextSlide() {
//     currentIndex = (currentIndex + 1) % slides.length;
//     showSlide(currentIndex);
//   }

//   function prevSlide() {
//     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//     showSlide(currentIndex);
//   }

//   nextBtn.addEventListener("click", nextSlide);
//   prevBtn.addEventListener("click", prevSlide);

// Автопрокрутка для мобильной версии
//     setInterval(nextSlide, 3000);
//   }
// });

// // Обработчик изменения размера окна
// window.addEventListener("resize", function () {
//   if (window.innerWidth <= 600) {
//     document.querySelector(".desktop-slider")?.swiper?.destroy();
//   }
// });
