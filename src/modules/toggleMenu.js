"use strict";

const toggleMenu = () => {
  const menu = document.querySelector("menu");

  const handlerMenu = (event) => {
    const target = event.target;

    if (
      target.closest(".menu") ||
      (!target.closest("menu") && menu.classList.contains("active-menu"))
    ) {
      menu.classList.toggle("active-menu");
    } else if (target.closest("menu") && target.closest('[href^="#"]')) {
      menu.classList.toggle("active-menu");
    }
  };
  document.body.addEventListener("click", handlerMenu);
};

export default toggleMenu;
