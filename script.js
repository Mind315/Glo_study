"use strict"; 
let money;
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let start = function () {
  
  do {
    money = prompt("Ваш месячный доход?", 31000);
  } while (!isNumber(money));
};
start();




let appData = {
    income: {},
    addIncome: [], 
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    period: 10,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
      let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","ЖКХ, Такси");
          appData.addExpenses = addExpenses.toLowerCase().split(", ");
          appData.deposit = confirm("Есть ли у вас депозит в банке?");
      
          let sum = 0,
            data;

        for (let i = 0; i < 2; i++) {
          data = prompt(`Введите обязательную статью расходов?`, `Расходы НОМЕР---${i} `);
          do {
            sum = +prompt('Во сколько это обойдется?', `300${i}`);
          }
          while(!isNumber(sum));  
          appData.expenses[data] = sum;
        }  
    },
    getExpensesMonth: function () {
      let sum = 0;
      for (let key in appData.expenses) {
        sum += appData.expenses[key];
      }
     console.log(`Расходы на месяц ${sum}`);
     return sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
      let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
      if (targetMonth >= 0) {
        return "Достигните цели накопления за " + targetMonth + " месяцев!!";
      } else if (targetMonth < 0) {
        return "Вы ничерта не накопите друг мой!";
      }
    },
    getStatusIncome: function () {
      if (appData.budgetDay > 1200) {
        return "У вас высокий уровень дохода";
      } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
        return "У вас средний уровень дохода";
      } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
        return "К сожалению у вас уровень дохода ниже среднего";
      } else if (appData.budgetDay <= 0) {
        return "Что то пошло не так!";
      }
    },
  };
  appData.asking();
  appData.getExpensesMonth();
  appData.getBudget();// Переменная с накоплениями
// --------------------------------------------------Вывод в консоль!
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
}