"use strict"; 
let money;
// ---------- Проверкап на число! если число = true
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// ----------- запрос за месячный доход.
let start = function () {
  do {
    money = prompt("Ваш месячный доход?", 31000);
  } while (!isNumber(money));
};
start();



// ----------------- Наш объект!
let appData = {
    income: {},
    addIncome: [], 
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 500000,
    period: 5,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    // --------- Запрос доп заработка + проверки.
    asking: function(){
      if(confirm('Есть ли доп заработок?')) {
        let itemIncome;
         do {
           itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'взятки');
         }
         while(!isNaN(itemIncome) || itemIncome === null);  
        
         let cashIncome;
         do {
            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', 5000);
         }
         while(!isNumber(cashIncome) || cashIncome === null);  
        appData.income[itemIncome] = cashIncome;
      }

      let addExpenses;
          do {
            addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","ЖКХ, Такси");
          }
          while(isNumber(addExpenses) || addExpenses === null);
      
          
          appData.addExpenses = addExpenses.toLowerCase().split(", ");
          appData.deposit = confirm("Есть ли у вас депозит в банке?");
      
          let sum = 0,
            data;
          // ------------ Цикл на 2 запроса расходов и стоимость.
        for (let i = 0; i < 2; i++) {
          do {
            data = prompt(`Введите обязательную статью расходов?`, `Расходы НОМЕР---${i} `);
          }
          while(isNumber(data) || data === null);

          
          do {
            sum = +prompt('Во сколько это обойдется?', `300${i}`);
          }
          while(!isNumber(sum) || sum === null);  
          appData.expenses[data] = sum;
        }  
    },
    // --------------------------Суммируем обязательные расходы за Month.
    getExpensesMonth: function () {
      let sum = 0;
      for (let key in appData.expenses) {
        sum += appData.expenses[key];
      }
     console.log(`Расходы на месяц ${sum}`);
     return sum;
    },
    // -------------------------------- тут наши накопления
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;// --- за месяц
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);// --- за день
    },
    // ---------------------- за сколько месяцев накопим до mission.
    getTargetMonth: function () {
      let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
      if (targetMonth >= 0) {
        return "Достигните цели накопления за " + targetMonth + " месяцев!!";
      } else if (targetMonth < 0) {
        return "Вы ничерта не накопите друг мой!";
      }
    },
    // ---------------------- выводим бомж или богатый.
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
    // -------------------------------- Проценты и залог в банке.
    getInfoDeposit: function() {
      if (appData.deposit) {
        do {
          appData.persentDeposit = prompt('Какойd в банке годовой процент?', '10');
        }
        while (!isNumber(appData.persentDeposit));
        do {
          appData.moneyDeposit = prompt('Какая заложена сумма в банке...?', 10000);
        }
        while (!isNumber(appData.moneyDeposit));
    }
    },
    calcSavedMoney: function() {
      return appData.budgetMonth * appData.period;
    }
  };
  appData.asking();
  appData.getExpensesMonth();
  appData.getBudget();

// --------------------------------------------------Вывод в консоль!
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
}
// ---Возможные расходы строкой в консоль  с большой буквы. Разделители запятая и пробел
let newArr = [];
for (let item of appData.addExpenses){
   item = item.charAt(0).toUpperCase() + item.substr(1);
   newArr.push(item);
}
console.log(newArr.join(', '));