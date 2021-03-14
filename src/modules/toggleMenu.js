'use strict';

const toggleMenu = () => {
   const btnMenu = document.querySelector(".menu"),
     menu = document.querySelector("menu"),
     closeBtn = document.querySelector(".close-btn");

   const handlerMenu = (event) => {
     let target = event.target;
     console.log(target);
     console.log(target.closest(".close-btn"));

     if (target.closest(".menu")) {
       menu.classList.toggle("active-menu");
     } else if (target === closeBtn || target.closest(".close-btn")) {
       menu.classList.toggle("active-menu");
     } else if (target !== menu) {
       menu.classList.remove("active-menu");
     }
   };

   btnMenu.addEventListener("click", handlerMenu);
   menu.addEventListener("click", handlerMenu);
 };

 export default toggleMenu;