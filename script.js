"use strict";
// ------------Проверяем! Если число - результат будет true!
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
//-------------- Переменные!
let money,
  income = "рэкет",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую",
    "ЖКХ, Такси, учеба"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 500000,
  period = 10;
let expenses = []; // <----- это массим с обязательными расходами.

  //------------------- Проверка!! Ваш месячный доход!
let start = function () {
  
  do {
    money = +prompt("Ваш месячный доход?", 31000);
  } while (!isNumber(money));
};
start();


//------------------ Получаем все расходы и их названия.
const getExpensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt(
      "Введите обязательную статью расходов?",
      "Оплата интернета"
    );

    let data;
    do {
      data = +prompt("Во сколько это обойдется?", 2000);
    } while (!isNumber(data));
    sum += data;
  }
  console.log(expenses);
  return sum;
};
//-------------------- Записали в переменную!
let expensesAmount = getExpensesMonth();


//-------------------------- Вычисляем сколько накопили за месяц.
const getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();// Переменная с накоплениями
let budgetDay = accumulatedMonth / 30;// Бюджет на день
let missionTarget = mission / accumulatedMonth;// ????????разобраться. Это что-то осталось от прошлого кода.

//--------------------------------Вычисления времени накопления цели в месяцах.
const getTargetMonth = function () {
  let targetMonth = Math.ceil(mission / accumulatedMonth);
  if (targetMonth >= 0) {
    return "Достигните цели накопления за " + targetMonth + " месяцев!!";
  } else if (targetMonth < 0) {
    return "Вы ничерта не накопите друг мой!";
  }
};

// -------------------------------Проверка на тип данных.
const showTypeOf = function (data) {
  console.log(data, typeof data);
};
//---------------------------------- Оценка, сколько денег ты зарабатываешь в день или ты бомж.
let getStatusIncome = function () {
  if (budgetDay > 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay >= 600 && budgetDay <= 1200) {
    return "У вас средний уровень дохода";
  } else if (budgetDay < 600 && budgetDay > 0) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else if (budgetDay <= 0) {
    return "Что то пошло не так!";
  }
};
// --------------------------------------------------Вывод в консоль!
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Расходы на месяц ${expensesAmount}`);
console.log(addExpenses.toLowerCase().split(", "));
console.log("Бюджет на месяц " + accumulatedMonth);
console.log(getTargetMonth());
console.log("Бюджет на день : " + Math.floor(budgetDay));

console.log(getStatusIncome());
