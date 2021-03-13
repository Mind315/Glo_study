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
	updateClock();  
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
  // ---добавление точек.
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
  newDot();
  // ------------------------------- Смена картинок==================
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
  changeImage();
  // -------------------- валидация калькулятора=================
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
  validCalc();
  const validForm = () => {
    // -------------------- получение форм в переменные============
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input");

      form.addEventListener("input", (event) => {
        const target = event.target;
        if (target.name === "user_name" || target.name === "user_message") {
          target.value = target.value.replace(/[^а-я\s-]/gi, "");
        } else if (target.name === "user_phone") {
          target.value = target.value.replace(/[^\d()-]/gi, "");
        } else if (target.name === "user_email") {
          target.value = target.value.replace(/[^a-z@_\-\.!\~\*']/gi, "");
        } else {
          return;
        }
      });

      inputs.forEach((input) => {
        input.addEventListener("blur", (event) => {
          const target = event.target;
          if (target.name === "user_name") {
            let temp =
              target.value.charAt(0).toUpperCase() +
              target.value.slice(1).toLowerCase();
            target.value = temp;
          } else if (
            target.name === "user_phone" ||
            target.name === "user_name" ||
            target.name === "user_email" ||
            target.name === "user_message"
          ) {
            target.value = target.value
              .replace(/^[ -]*|( |-)(?=\1)|[ -]*$/g, "")
              .replace(/ +/g, " ")
              .trim();
          } else if (target.name === "user_email") {
            target.value = target.value.replace(/[^a-z@_\-\.!\~\*']/gi, "");
          } else {
            return;
          }
        });
      });
    });

  };
  validForm();
  // -------------------------------------------------------------------------------------------
  // ------------------------------------- Канкулятор! =================
  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcDay = document.querySelector(".calc-day"),
      calcCount = document.querySelector(".calc-count"),
      totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      totalValue.textContent = total;
    };

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;

      if (
        target === calcType ||
        target === calcSquare ||
        target === calcDay ||
        target === calcCount
      ) {
        countSum();
      }
    });
  };
  calc(100);

  // ----------------------------------------- send-ajax-form
  const sendForm = () => {
    // ---- сообщекния которые будем показывать пользователю
		const errorMessage = 'Что-то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

      const postData = (body) => {
        return fetch('./server.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/from-data'
          },
          body: JSON.stringify(body)
        });
      };
    // const postData = (body) => {

    //   return new Promise((resolve, reject) => {
    //     const request = new XMLHttpRequest();

    //     request.addEventListener('readystatechange', () => {
    //       if (request.readyState !== 4) {
    //         // проверяем (как доходит до 4 - обхолим)
    //         return;
    //       }
    //       if (request.status === 200) {
    //         resolve();
    //       } else {
    //         reject(request.status);
    //       }
    //     });
  
    //     request.open('POST', './server.php'); // сам запрос через POST
      
    //     request.setRequestHeader('Content-Type', 'application/json');
    //      // отправляем форм дату переделывая в json формат
    //     // либо можно просто request.send(formData);
    //     request.send(JSON.stringify(body));
    //   });

    // };
      
  // ----------- -----------------очистка инпутов.
		const clearInput = (clearIdForm) => {
			const form = document.getElementById(clearIdForm);
      form.reset();
		 
		};
// ---------------------------------------валидация форм
		const validationForm = event => {
      // ------ перенес условия из прошлой валидации
      const target = event.target;
      if (target.name === "user_name" || target.name === "user_message") {
        target.value = target.value.replace(/[^а-я\s-]/gi, "");
      } else if (target.name === "user_phone") {
        target.value = target.value.replace(/[^\d()-]/gi, "");
      } else if (target.name === "user_email") {
        target.value = target.value.replace(/[^a-z@_\-\.!\~\*']/gi, "");
      } else {
        return;
      }
		};

		const actionsForm = (selectedForm) => {
			const form = document.getElementById(selectedForm);
			const statusMessage = document.createElement('div');


			statusMessage.style.cssText = 'font-size: 2rem; color: #fff';
	

			form.addEventListener('submit', event => {
				const formData = new FormData(form);
				const body = {};

        
        statusMessage.textContent = '';
        statusMessage.className = 'sk-rotating-plane';
				// statusMessage.textContent = loadMessage;
				event.preventDefault();
				form.appendChild(statusMessage);

				formData.forEach((val, key) => {
					body[key] = val;
				});

          postData(body)
            .then((response) => {
                if(response.status !== 200) {
                  throw new Error('status network is not 200');
                }
                statusMessage.className = '';
					      statusMessage.textContent = successMessage;
				      	clearInput(selectedForm);
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
				// postData(body, () => {
          
        //   statusMessage.className = '';
				// 	statusMessage.textContent = successMessage;
          
				// 	clearInput(selectedForm);
				// }, error => {
				// 	statusMessage.textContent = errorMessage;
				// 	console.error(error);
				// });
			});
			form.addEventListener('input', validationForm);
		};
		actionsForm('form1');
		actionsForm('form2');
		actionsForm('form3');
	};
  sendForm();
  slider();
});
