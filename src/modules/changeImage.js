'use strict';

const changeImage = () => {
   let temp; //временная переменная для записи изначальной картинки
   let all = document.querySelectorAll(".command__photo");
   all.forEach((item) => {
     item.addEventListener("mouseenter", (event) => {
       temp = event.target.src; // записали исходную
       event.target.src = event.target.dataset.img; // в src передали новую
     });
     item.addEventListener("mouseout", (event) => {
       event.target.src = temp; // в src вернули исходную
     });
   });
 };

 export default changeImage;