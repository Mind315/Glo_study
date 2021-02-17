"use strict";
//-----------------------------------Кнопка "Расчитать"------------------
let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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

const AppData = function () {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = []; 
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

    // ----------- запрос за месячный доход.
AppData.prototype.start = function () {
     
      this.budget = +salaryAmount.value;
     
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      //-------вызов showResult - должен быть последним!!!
      this.showResult();
      this.blockInputs();
    };

AppData.prototype.res = function() {  // ----------------- тут я пытаюсь сделать сброс!! черт его дери
      let inputs = document.querySelectorAll('[type="text"]');
        for(let i = 0; i < inputs.length; i++) {//-------перебираю все инпуты
          inputs[i].disabled = false;
          inputs[i].value = '';      
        }
        start.style.display = 'inline';// ---- старт показал
        cancel.style.display = 'none';// ---- сброс скрыл

         // -------------- сбросил все данные
        numberPeriod.textContent = 1;
        range.value = 1;
         
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.addExpenses = [];
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            
          start.disabled = true;
          // -------------------Проверка блоков "Дополнительный доход" и удаление если болльше 1"
        if(incomeItems.length > 1) {
          console.log('incomeItems.length: ', incomeItems.length);
          for(let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
          }     
        }
        // -------------------Проверка блоков "обязательный расходы" и удаление если болльше 1"
        if(expensesItems.length > 1) {
          for(let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
          }      
        }
        // ---------- проверка кнопки ПЛЮС и добавление - если не ее нет.
        if(btnPlus[0].style.display == 'none' || btnPlus[1].style.display == 'none') {
          btnPlus[0].style.display = 'block';
          btnPlus[1].style.display = 'block';
        }      
    };
    // ------------ блокировка
AppData.prototype.blockInputs = function() {
      let inputs = document.querySelectorAll('[type="text"]');
      for(let i = 0; i < inputs.length; i++) {//-------перебираю все инпуты
        inputs[i].disabled = true;
            
        start.style.display = 'none';
        cancel.style.display = 'inline';
      }
    };

AppData.prototype.showResult = function() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
      incomePeriodValue.value = this.calcPeriod();

    // ----------отслеживать период и  менять значение в  “Накопления за период”
      range.addEventListener('input', function() {
        incomePeriodValue.value = appData.calcPeriod();
      });
    };

    // ------------ Добавление новых полей через кнопку expensesPlus
AppData.prototype.addExpensesBlock = function() {
      
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
      }
    };
    // ---------------Добавление полей через кнопку incomePlus--------
AppData.prototype.addIncomeBlock = function() {

      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if(incomeItems.length === 3) {
        incomePlus.style.display = 'none';
      }
    };
AppData.prototype.getExpenses = function() {
      expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    };
AppData.prototype.getIncome = function() {
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
      };
    
AppData.prototype.getAddExpenses = function() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    };
AppData.prototype.getAddIncome = function() {
      additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    };
  
    // --------------------------Суммируем обязательные расходы за Month.
AppData.prototype.getExpensesMonth = function () {
      
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }
    };
    // -------------------------------- тут наши накопления
AppData.prototype.getBudget = function () {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;// --- за месяц
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);// --- за день
    },
    // ---------------------- за сколько месяцев накопим до mission.
AppData.prototype.getTargetMonth = function () {
      let targetMonth = Math.ceil(targetAmount.value / appData.budgetMonth);
      if (targetMonth >= 0) {
        return "Достигните цели накопления за " + targetMonth + " месяцев!!";
      } else if (targetMonth < 0) {
        return "Вы ничерта не накопите друг мой!";
      }
    };

    // ---------------------- выводим бомж или богатый.
AppData.prototype.getStatusIncome = function () {
      if (appData.budgetDay > 1200) {
        return "У вас высокий уровень дохода";
      } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
        return "У вас средний уровень дохода";
      } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
        return "К сожалению у вас уровень дохода ниже среднего";
      } else if (appData.budgetDay <= 0) {
        return "Что то пошло не так!";
      }
    };
    // -------------------------------- Проценты и залог в банке.
AppData.prototype.getInfoDeposit = function() {
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
    };

AppData.prototype.calcPeriod = function() {
      return appData.budgetMonth * range.value;
    };
    // ----------------выводим изменения range - в число------------
AppData.prototype.changeNumberPeriod = function() {
      numberPeriod.textContent = range.value;
    };
  
AppData.prototype.eventListeners = function() { 
  start.addEventListener('click', appData.start.bind(appData));             //------- кнопка "Расчитать"
  cancel.addEventListener('click', appData.res.bind(appData));             //------- кнопка "сбросить"
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
};

const appData = new AppData();
appData.eventListeners();
console.log(appData);
