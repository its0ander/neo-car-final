document.addEventListener("DOMContentLoaded", () => {
  const back = document.querySelector(".back");

  back.addEventListener("click", () => {
    window.history.back();
  });

  const section = document.querySelector(".objects");
  const elements = [
    {
      source: "images/avto_fonar.jpeg",
      Text: "Автомобильный фонарь",
    },
    {
      source: "images/careta_fonar.jpg",
      Text: "Каретный фонарь конца XIX века",
    },
    {
      source: "images/fonarshik.jpg",
      Text: "Английский фонарщик",
    },
    {
      source: "images/kerosin_lampy.jpg",
      Text: "Керосиновые лампы конца XIX - начала ХХ века",
    },
    {
      source: "images/mysh_fonar.jpg",
      Text: "Фонарь «Летучая мышь»",
    },
    {
      source: "images/swecha_fonar.jpg",
      Text: "Свечной фонарь XIX века",
    },
    {
      source: "images/velosiped_fonar.jpeg",
      Text: "Велосипедный фонарь",
    },
  ];

  const i = Math.floor(elements.length * Math.random());

  const img = document.createElement("img");
  img.src = elements[i].source;
  section.appendChild(img);

  const txt = document.createElement("p");
  txt.innerText = elements[i].Text;
  section.appendChild(txt);
});
