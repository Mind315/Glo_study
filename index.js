//-----------------------------------Кнопка "Расчитать"------------------
let calc = document.getElementById('#start'),
//-----------------------------------Кнопки Плюс-------------------------
    btnPlusIncome = document.querySelector('.income_add'),
    btnPlusExpenses = document.querySelector('.expenses_add'),
//------------------------------------- Чекбокс Депозит---------------------------
    chekBox = document.querySelector('.deposit-check'),
//-----------------------------------Поля ввода возможных жоходов  ---------------------
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
let monthIncome = document.querySelector('.salary-amount'),
// -------------------------------Доп доход----------------------------
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
// -----------------------------------Обяхательные расходы---------------------------
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
//------------------------------ Возможноые расходы-------------------------
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
//---------------------------------Цель-------------------------
    targetAmount = document.querySelector('.target-amount'),
// ------------------------------Период расчета(range)-----------------------------
    range = document.querySelector('[type = range]');


