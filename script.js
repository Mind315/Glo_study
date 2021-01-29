let money = 30000,
   income = 'рэкет',
   addExpenses = 'ЖКХ, Такси, учеба',
   deposit = true,
   mission = 500000,
   period = 10;

   console.log(typeof money);
   console.log(typeof income);
   console.log(typeof deposit);

   console.log(addExpenses.legth);

   console.log('Период равен ' + period + ' месяцев');
   console.log('Цель заработать ' + mission + ' рублей');
   console.log(addExpenses.toLowerCase().split(', '));  

let budgetDay = money / 30;
console.log(budgetDay);