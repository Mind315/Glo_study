"use strict";
//-----------------------------------Кнопка "Расчитать"------------------
let start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  //-----------------------------------Кнопки Плюс-------------------------
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  btnPlusIncome = document.querySelector(".income_add"),
  btnPlusExpenses = document.querySelector(".expenses_add"),
  //--------------------------- Депозит(check, bank, amount, percent)---------------------------
  depositCheck = document.querySelector("#deposit-check"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent"),
  //-----------------------------------Поля ввода возможных жоходов  ---------------------
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  incomeElem1 = document.querySelectorAll(".additional_income-item")[0],
  incomeElem2 = document.querySelectorAll(".additional_income-item")[1],
  //-------------------------------Поля ввода в правой части-----------------------
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  additionalIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  additionalExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0];
// ------------------------------Месячный доход------------------------------
let salaryAmount = document.querySelector(".salary-amount"),
  // -------------------------------Доп доход----------------------------
  incomeTitle = document.querySelector(".income-title"),
  incomeItems = document.querySelectorAll(".income-items"),
  // -----------------------------------Обяхательные расходы---------------------------
  expensesTitle = document.querySelector(".expenses-title"),
  expensesAmount = document.querySelector(".expenses-amount"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  //------------------------------ Возможноые расходы-------------------------
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  //---------------------------------Цель-------------------------
  targetAmount = document.querySelector(".target-amount"),
  // ------------------------------Период расчета(range)-----------------------------
  range = document.querySelector("[type = range]"),
  numberPeriod = document.querySelector(".period-amount");

// ---------- Проверкап на число! если число = true
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// ------------------------------- Наш объект!
class AppData {
  constructor() {
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
  }

  // ----------- запрос за месячный доход.
  start() {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getInfoDeposit();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.calcBudgetPercent();
    this.getBudget();
    //-------вызов showResult
    this.showResult();
    this.blockInputs();
  }

  calcBudgetPercent() {
    this.percentDeposit = +depositPercent.value;
    this.moneyDeposit = +depositAmount.value;
  }
  res() {
    // ----------------- тут я пытаюсь сделать сброс!! черт его дери
    const inputs = document.querySelectorAll('[type="text"]');
    for (let i = 0; i < inputs.length; i++) {
      //-------перебираю все инпуты
      inputs[i].disabled = false;
      inputs[i].value = "";
    }
    start.style.display = "inline"; // ---- старт показал
    cancel.style.display = "none"; // ---- сброс скрыл

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
    if (incomeItems.length > 1) {
      for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].remove();
      }
    }
    // -------------------Проверка блоков "обязательный расходы" и удаление если болльше 1"
    if (expensesItems.length > 1) {
      for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].remove();
      }
    }
    // ---------- проверка кнопки ПЛЮС и добавление - если не ее нет.
    if (
      btnPlus[0].style.display == "none" ||
      btnPlus[1].style.display == "none"
    ) {
      btnPlus[0].style.display = "block";
      btnPlus[1].style.display = "block";
    }
  }
  // ------------ блокировка
  blockInputs() {
    const inputs = document.querySelectorAll('[type="text"]');
    for (let i = 0; i < inputs.length; i++) {
      //-------перебираю все инпуты
      inputs[i].disabled = true;

      start.style.display = "none";
      cancel.style.display = "inline";
    }
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

    // ----------отслеживать период и  менять значение в  “Накопления за период”
    range.addEventListener("input", () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }

  // ------------ Добавление новых полей через кнопку expensesPlus
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  }
  // ---------------Добавление полей через кнопку incomePlus--------
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }

  // --------------------------Суммируем обязательные расходы за Month.
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  // -------------------------------- тут наши накопления
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit; // --- за месяц
    this.budgetDay = Math.floor(this.budgetMonth / 30); // --- за день
  }
  // ---------------------- за сколько месяцев накопим до mission.
  getTargetMonth() {
    const targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
    if (targetMonth >= 0) {
      return "Достигните цели накопления за " + targetMonth + " месяцев!!";
    } else if (targetMonth < 0) {
      return "Вы ничерта не накопите друг мой!";
    }
  }

  // ---------------------- выводим бомж или богатый.
  getStatusIncome() {
    if (this.budgetDay > 1200) {
      return "У вас высокий уровень дохода";
    } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
      return "У вас средний уровень дохода";
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (this.budgetDay <= 0) {
      return "Что то пошло не так!";
    }
  }
  // -------------------------------- Проценты и залог в банке.
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = +depositPercent.value;
      this.moneyDeposit = +depositAmount.value;
    }
  }

  calcPeriod() {
    return this.budgetMonth * range.value;
  }
  // ----------------выводим изменения range - в число------------
  changeNumberPeriod() {
    numberPeriod.textContent = range.value;
  }

  depositWalid() {
    if (depositPercent.value < 0 || depositPercent.value > 100) {
      alert("Введите корректное значение в поле проценты");
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  }
  // ---------------------- высчитываем проценты
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === "other") {
      depositPercent.style.display = "inline-block";
      depositPercent.removeAttribute("disabled");
      depositPercent.value = "";
    } else {
      depositPercent.value = valueSelect;
    }
  }

  // ---------------- Добавляем арсчет депозита по checkbox
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      depositPercent.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
      // ---------------- скрываем, если  убрали check
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositPercent.style.display = "none";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePercent);

      // ------------------ обнуляем значения
      depositBank.value = "";
      depositAmount.value = "";
      depositPercent.value = "";
    }
  }

  eventListeners() {
    start.addEventListener("click", this.start.bind(this)); //------- кнопка "Расчитать"
    cancel.addEventListener("click", this.res.bind(this)); //------- кнопка "сбросить"
    expensesPlus.addEventListener("click", this.addExpensesBlock); // ------ кнопка ПЛЮС обязательыне расходы
    incomePlus.addEventListener("click", this.addIncomeBlock); // ------ кнопка ПЛЮС дополнительные расходы
    range.addEventListener("input", this.changeNumberPeriod); //---------изменения range;
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
    depositPercent.addEventListener("keyup", this.depositWalid);

    salaryAmount.addEventListener("input", function () {
      // -- проверяем поле "Месячный доход"
      if (salaryAmount.value === "") {
        // ---если пустое
        start.disabled = true; // --- блокируем
      } else {
        // --- иначе
        start.disabled = false; // --- не блокируем
      }
    });

    //appData.getInfoDeposit();
  }
}

const appData = new AppData();
appData.eventListeners();
