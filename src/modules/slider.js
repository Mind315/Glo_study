'use strict';

const slider = () => {
   //присваиваем переменные
   const slide = document.querySelectorAll(".portfolio-item"),
     btn = document.querySelectorAll(".portfolio-btn"),
     dot = document.querySelectorAll(".dot"),
     slider = document.querySelector(".portfolio-content");

   let currentSlide = 0,
     interval;
   // функция переключения на след слайд
   const prevSlide = (elem, index, strClass) => {
     elem[index].classList.remove(strClass);
   };
   // функция переключения на пред слайд
   const nextSlide = (elem, index, strClass) => {
     elem[index].classList.add(strClass);
   };
   const autoPlaySlide = () => {
     prevSlide(slide, currentSlide, "portfolio-item-active"); // убираем класс у слайда
     prevSlide(dot, currentSlide, "dot-active"); //убираем класс у точки
     currentSlide++; // переходим на след слайд
     if (currentSlide >= slide.length) {
       //проверяем если он последний
       currentSlide = 0; //переходим к началу
     }
     nextSlide(slide, currentSlide, "portfolio-item-active"); //добавляем классы
     nextSlide(dot, currentSlide, "dot-active"); //добавляем классы
   };

   const startSlide = (time = 3000) => {
     //вызов функции автослайдов
     interval = setInterval(autoPlaySlide, time);
   };
   const stopSlide = () => {
     clearInterval(interval);
   };

   slider.addEventListener("click", (event) => {
     event.preventDefault();
     let target = event.target;
     // если нажимаем мимо стрелок и точек -
     if (!target.matches(".portfolio-btn, .dot")) {
       return; // событие не срабатывает!
     }
     // если нажали на стрелки и точки - проходим дальше
     prevSlide(slide, currentSlide, "portfolio-item-active"); //снова убираем классы
     prevSlide(dot, currentSlide, "dot-active"); //убираем у точек
     // проверяем на какой елемент нажали
     if (target.matches("#arrow-right")) {
       //стрелка вправо
       currentSlide++;
     } else if (target.matches("#arrow-left")) {
       //мтрелка влево
       currentSlide--;
     } else if (target.matches(".dot")) {
       // точка
       dot.forEach((elem, index) => {
         if (elem === target) {
           currentSlide = index; // приравниваем точку к слайду и открываем
         }
       });
     }
     // проверки на последний и первый слайдер чтобы продолжить по кругу
     if (currentSlide >= slide.length) {
       currentSlide = 0;
     }
     if (currentSlide < 0) {
       currentSlide = slide.length - 1;
     }
     // тут присваеваем классы к слайдам и точкам чтобы показать
     nextSlide(slide, currentSlide, "portfolio-item-active");
     nextSlide(dot, currentSlide, "dot-active");
   });
   //выклюение автослайда при наведении
   slider.addEventListener("mouseover", (event) => {
     if (
       event.target.matches(".portfolio-btn") ||
       event.target.matches(".dot")
     ) {
       stopSlide();
     }
   });
   // включение автослайда когда убрали курсор с елементов
   slider.addEventListener("mouseout", (event) => {
     if (
       event.target.matches(".portfolio-btn") ||
       event.target.matches(".dot")
     ) {
       startSlide();
     }
   });

   startSlide(1100);
 };

 export default slider;