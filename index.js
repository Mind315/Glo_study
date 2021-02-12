"use strict";
//-----------------------------------Кнопка "Расчитать"------------------
let start = document.getElementById('start'),
//-----------------------------------Кнопки Плюс-------------------------
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    btnPlusIncome = document.querySelector('.income_add'),
    btnPlusExpenses = document.querySelector('.expenses_add'),
//------------------------------------- Чекбокс Депозит---------------------------
    chekBox = document.querySelector('.deposit-check'),
//-----------------------------------Поля ввода возможных жоходов  ---------------------
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    incomeElem1 = document.querySelectorAll('.additional_income-item')[0],
    incomeElem2 = document.querySelectorAll('.additional_income-item')[1],
//-------------------------------Поля ввода в правой части-----------------------
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];
// ------------------------------Месячный доход------------------------------
let salaryAmount = document.querySelector('.salary-amount'),
// -------------------------------Доп доход----------------------------
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
// -----------------------------------Обяхательные расходы---------------------------
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
//------------------------------ Возможноые расходы-------------------------
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
//---------------------------------Цель-------------------------
    targetAmount = document.querySelector('.target-amount'),
// ------------------------------Период расчета(range)-----------------------------
    range = document.querySelector('[type = range]'),
    numberPeriod = document.querySelector('.period-amount');

// ---------- Проверкап на число! если число = true
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


// ------------------------------- Наш объект!
let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [], 
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    // ----------- запрос за месячный доход.
    start: function () {
      // if (salaryAmount.value === '') {
      //   alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      //   return;
      // }
      appData.budget = +salaryAmount.value;

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();
      //-------вызов showResult - должен быть последним!!!
      appData.showResult();
    },
    showResult: function() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      incomePeriodValue.value = appData.calcPeriod();

    // ----------отслеживать период и  менять значение в  “Накопления за период”
      range.addEventListener('input', function() {
        incomePeriodValue.value = appData.calcPeriod();
      });
    },
    // ------------ Добавление новых полей через кнопку expensesPlus
    addExpensesBlock: function() {
      
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
      }
    },
    // ---------------Добавление полей через кнопку incomePlus--------
    addIncomeBlock: function() {

      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if(incomeItems.length === 3) {
        incomePlus.style.display = 'none';
      }
    },
    getExpenses: function() {
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
    getIncome: function() {
      incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
        }
      });

         for (let key in appData.income) {
           appData.incomeMonth += +appData.income[key];
         }
      },
    
    getAddExpenses: function() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },
    getAddIncome: function() {
      additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
  
    // --------------------------Суммируем обязательные расходы за Month.
    getExpensesMonth: function () {
      
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }
     //console.log(`Расходы на месяц ${sum}`);
     
    },
    // -------------------------------- тут наши накопления
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;// --- за месяц
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);// --- за день
    },
    // ---------------------- за сколько месяцев накопим до mission.
    getTargetMonth: function () {
      let targetMonth = Math.ceil(targetAmount.value / appData.budgetMonth);
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
    calcPeriod: function() {
      return appData.budgetMonth * range.value;
    },
    // ----------------выводим изменения range - в число------------
    changeNumberPeriod: function() {
      numberPeriod.textContent = range.value;
    }
  };

start.addEventListener('click', appData.start);             //------- кнопка "Расчитать"
expensesPlus.addEventListener('click',appData.addExpensesBlock);// ------ кнопка ПЛЮС обязательыне расходы
incomePlus.addEventListener('click', appData.addIncomeBlock);// ------ кнопка ПЛЮС дополнительные расходы
range.addEventListener('input', appData.changeNumberPeriod);//---------изменения range;
salaryAmount.addEventListener('input', function () {  // -- проверяем поле "Месячный доход"
  if (salaryAmount.value === '') {// ---если пустое
     start.disabled = true;       // --- блокируем
  } else {                        // --- иначе
     start.disabled = false;      // --- не блокируем
  }
});

  appData.getInfoDeposit();
// --------------------------------------------------Вывод в консоль!
//console.log(appData.getTargetMonth());


//console.log('Наша программа включает в себя данные: ');
//for (let elem in appData) {
    //console.log(elem, appData[elem]);
//}
// ---Возможные расходы строкой в консоль  с большой буквы. Разделители запятая и пробел
let newArr = [];
for (let item of appData.addExpenses){
   item = item.charAt(0).toUpperCase() + item.substr(1);
   newArr.push(item);
}
console.log(newArr.join(', '));



