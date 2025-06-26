document.addEventListener("DOMContentLoaded", () => {
  //   perehod();
  perehod_2();
  perehod_3();
});

function perehod() {
  document
    .getElementById("confirmLink")
    .addEventListener("click", function (e) {
      // Отменяем переход по ссылке по умолчанию
      e.preventDefault();

      // Спрашиваем подтверждение
      const isConfirmed = confirm(
        "Вы действительно хотите перейти по этой ссылке?"
      );

      if (isConfirmed) {
        // Если подтверждено — открываем ссылку в новой вкладке
        window.open(this.href, "_blank");
      }
    });
}

function perehod_2() {
  const btn = document.getElementById("customConfirmBtn");
  const modal = document.getElementById("modal");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  let linkUrl = "https://its0ander.github.io/3_module/";

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  yesBtn.addEventListener("click", () => {
    window.open(linkUrl, "_blank");
    modal.style.display = "none";
  });

  noBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
function perehod_3() {
  const btn = document.getElementById("customConfirmBtn_2");
  const modal = document.getElementById("modal_2");
  const yesBtn = document.getElementById("yesBtn_2");
  const noBtn = document.getElementById("noBtn_2");

  let linkUrl = "https://its0ander.github.io/web-poster/";

  btn.addEventListener("click", function (e1) {
    e1.preventDefault();
    modal.style.display = "block";
  });

  yesBtn_2.addEventListener("click", () => {
    window.open(linkUrl, "_blank");
    modal.style.display = "none";
  });

  noBtn_2.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
