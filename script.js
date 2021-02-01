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
  expenses2 = prompt(
    "Введите обязательную статью расходов?",
    "Поход в Рок-Бар!"
  ),
  amount1 = +prompt("Во сколько это обойдется?", 1000),
  amount2 = +prompt("Во сколько это обойдется?", 3000),
  budgetMonth = money - (amount1 + amount2),
  budgetDay = budgetMonth / 30,
  mission = 500000,
  period = 10,
  missionTarget = mission / budgetMonth;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase().split(", "));
console.log("Бюджет на месяц " + budgetMonth);
console.log(
  "цель будет достигнута за: " + Math.ceil(missionTarget) + " месяцев"
);
console.log("Бюджет на день : " + Math.floor(budgetDay));

if (budgetDay > 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay >= 600 && budgetDay <= 1200) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay < 600 && budgetDay > 0) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else if (budgetDay <= 0) {
  console.log("Что то пошло не так!");
}
