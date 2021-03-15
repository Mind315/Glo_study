'use strict';

const togglePopup = () => {
   const popup = document.querySelector(".popup"),
     popupBtn = document.querySelectorAll(".popup-btn"),
     popUpClose = document.querySelector(".popup-close");
     
   let popupStartPos = 700,
     popupCount = 700;

   //----------------------- Аниммм
   const animPopup = () => {
     if (popupStartPos > 0) {
       popupCount -= 20;
     } else {
       popupCount += 20;
     }
     document.querySelector(
       ".popup-content"
     ).style.transform = `translateY(${popupCount}px)`;

     if (popupStartPos > 0 ? popupCount > 0 : popupCount < 0) {
       requestAnimationFrame(animPopup);
     }
   };
   //----------------------- Аниммм
   popupBtn.forEach((elem) => {
     elem.addEventListener("click", () => {
       popup.style.display = "block";
       if (screen.width >= 768) {
         popupCount = popupStartPos;
         requestAnimationFrame(animPopup);
       }
     });
   });
   popup.addEventListener("click", (event) => {
     let target = event.target;

     if (target.classList.contains("popup-close")) {
       popup.style.display = "none";
     } else {
       target = target.closest(".popup-content");
       if (!target) {
         popup.style.display = "none";
       }
     }
   });
 };

 export default togglePopup;