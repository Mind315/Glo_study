"use strict";
//--------------------------------------------Переменные
let money = +prompt("Ваш месячный доход?", 31000),
  income = "рэкет",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую",
    "ЖКХ, Такси, учеба"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  expenses1 = prompt(
    "Введите обязательную статью расходов?",
    "Оплата интернета"
  ),
  amount1 = +prompt("Во сколько это обойдется?", 1000),
  expenses2 = prompt(
    "Введите обязательную статью расходов?",
    "Поход в Рок-Бар!"
  ),
  amount2 = +prompt("Во сколько это обойдется?", 3000),
  budgetDay = (money - (amount1 + amount2)) / 30,
  mission = 500000,
  period = 10,
  missionTarget = mission / (money - (amount1 + amount2));
// --------------------------------------------------------------Функции
const getExpensesMonth = function () {
  return amount1 + amount2;
};
const getAccumulatedMonth = function () {
  return money - (amount1 + amount2);
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
  return mission / accumulatedMonth;
};

const showTypeOf = function (data) {
  console.log(data, typeof data);
};

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

console.log(getExpensesMonth());
console.log(addExpenses.toLowerCase().split(", "));
console.log("Бюджет на месяц " + accumulatedMonth);
console.log(
  "цель будет достигнута за: " + Math.ceil(getTargetMonth()) + " месяцев"
);
console.log("Бюджет на день : " + Math.floor(budgetDay));

console.log(getStatusIncome());
