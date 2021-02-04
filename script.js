"use strict";

const isNum = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const randNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const guessNumber = function () {
  let x = randNumber(1, 100);
  const askNumber = function () {
    let num = prompt("Угадай число от 1 до 100");
   
    if (num === null) {
      alert("Игра окончена!!!");
    } 
    if (isNum(num)) {
      const realNum = num;
      if (realNum > x) {
        alert("Загаданное число меньше");
        askNumber();
      } else if (realNum < x) {
        alert("Загаданное число больше");
        askNumber();
      } else {
        if (confirm("Поздравляю, Вы угадали!!!")) {
          guessNumber();
        } else {
          alert("Игра окончена!!!");
          return;
        }
      }
    } else if(typeof num === "string") {
      alert('Это не число. Заново!');
      askNumber();
    }
  };
  askNumber();
};
guessNumber();
