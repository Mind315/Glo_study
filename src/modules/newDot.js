'use strict';

const newDot = () => {
   let portfolioItem = document.querySelectorAll(".portfolio-item"),
     portfolioDots = document.querySelector(".portfolio-dots");

   for (let i = 0; i < portfolioItem.length; i++) {
     let li = document.createElement("li");
     li.classList.add("dot");
     portfolioDots.append(li);
   }

   portfolioDots.children[0].classList.add("dot-active");
 };

 export default newDot;