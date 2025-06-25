document.addEventListener("DOMContentLoaded", () => {
  showBurgerMenu();
  clicker();
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
