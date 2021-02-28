window.addEventListener("DOMContentLoaded", function () {
  "use strict";
  //----------------- это у нас TIMER
  function countTimer(deadline) {
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");
    let timerId;

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24;

      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }

    function zeroBefore(item) {
      if (item < 10) {
        item = `0${item}`;
      }
      return item;
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = zeroBefore(timer.hours);
      timerMinutes.textContent = zeroBefore(timer.minutes);
      timerSeconds.textContent = zeroBefore(timer.seconds);
      // if(timer.timeRemaining > 0) {
      //    setTimeout(updateClock, 1000);
      // }
      if (timer.timeRemaining > 0) {
        console.log();
      } else {
        clearInterval(timerId);
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }
    }
    timerId = setInterval(updateClock, 1000);
  }

  countTimer("27 march 2021");

  // ------------------- MENU--------------------

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

  toggleMenu();

  // ----------------- POPUP
  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popUpClose = document.querySelector(".popup-close");
    let popupStartPos = -700,
      popupCount = -700;

    //----------------------- Аниммм
    const animPopup = () => {
      if (popupStartPos > 0) {
        popupCount -= 10;
      } else {
        popupCount += 10;
      }
      document.querySelector(
        ".popup-content"
      ).style.transform = `translateX(${popupCount}px)`;

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
    // popUpClose.addEventListener("click", () => {
    //   popup.style.display = "none";
    // });

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

  togglePopup();

  //========================== TABS
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // --------------------------SLIDER----------
  const slider = () => {
    //присваиваем переменные
    const slide = document.querySelectorAll('.portfolio-item'),
      btn = document.querySelectorAll('.portfolio-btn'),
      dot = document.querySelectorAll('.dot'),
      slider = document.querySelector('.portfolio-content');

      let currentSlide = 0,
      interval;
    // функция переключения на след слайд
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    }
    // функция переключения на пред слайд
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    }
    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, 'portfolio-item-active');// убираем класс у слайда
        prevSlide(dot, currentSlide, 'dot-active');//убираем класс у точки
        currentSlide++;// переходим на след слайд
        if(currentSlide >= slide.length) {//проверяем если он последний
          currentSlide = 0;//переходим к началу
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');//добавляем классы
        nextSlide(dot, currentSlide, 'dot-active');//добавляем классы

      };

      const startSlide = (time = 3000) => {//вызов функции автослайдов
        interval = setInterval(autoPlaySlide, time);
      };
      const stopSlide = () => {
        clearInterval(interval);
      };

      slider.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;
        // если нажимаем мимо стрелок и точек - 
        if (!target.matches('.portfolio-btn, .dot')) {
          return;// событие не срабатывает!
        }
        // если нажали на стрелки и точки - проходим дальше
        prevSlide(slide, currentSlide, 'portfolio-item-active');//снова убираем классы
        prevSlide(dot, currentSlide, 'dot-active');//убираем у точек
        // проверяем на какой елемент нажали
        if(target.matches('#arrow-right')) { //стрелка вправо
          currentSlide++;
        } else if (target.matches('#arrow-left')) {//мтрелка влево
          currentSlide--;
        } else if (target.matches('.dot')) {// точка
          dot.forEach((elem, index) => {
            if(elem === target) {
              currentSlide = index;// приравниваем точку к слайду и открываем
            }
          });
        }
        // проверки на последний и первый слайдер чтобы продолжить по кругу
        if(currentSlide >= slide.length) {
          currentSlide = 0;
        } 
        if(currentSlide < 0) {
          currentSlide = slide.length - 1;
        }
        // тут присваеваем классы к слайдам и точкам чтобы показать
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
      });
      //выклюение автослайда при наведении
      slider.addEventListener('mouseover', (event) => {
        if(event.target.matches('.portfolio-btn') || 
        event.target.matches('.dot')) {
          stopSlide();
        }
      });
      // включение автослайда когда убрали курсор с елементов
      slider.addEventListener('mouseout', (event) => {
        if(event.target.matches('.portfolio-btn') || 
        event.target.matches('.dot')) {
          startSlide();
        }
      });

      startSlide(1100);

  };
// ---добавление точек.
  const newDot = () => {
		let portfolioItem = document.querySelectorAll('.portfolio-item'),
			portfolioDots = document.querySelector('.portfolio-dots');


    for(let i = 0; i <portfolioItem.length; i++) {
      let li = document.createElement('li');
			li.classList.add('dot');
			portfolioDots.append(li);
    }
	

		portfolioDots.children[0].classList.add('dot-active');
	};
  newDot();

  slider();
});
