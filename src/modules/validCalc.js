'use strict';

const validCalc = () => {
   const calc = document.querySelector(".calc-block");
   calc.addEventListener("input", (event) => {
     let target = event.target;
     // тут сравниваю и делаю валидацию
     if (
       target.className === "calc-item calc-count" || // это костыль!!
       target.className === "calc-item calc-day" || // и  это тоже костыль!!
       target.className === "calc-item calc-square"
     ) {
       target.value = target.value.replace(/\D/, "");
     }
   });
 };

 export default validCalc;