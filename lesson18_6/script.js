let newDate = new Date();

const greetnig = document.querySelector(".greeting"),
  day = document.querySelector(".day"),
  time = document.querySelector(".time"),
  newYear = document.querySelector(".new-year");
//-------- тут мы получаем время и желаем доброго чего-то там
let timeNow = newDate.getHours();
console.log(timeNow);

if (timeNow > 18 && timeNow <= 24) {
   greetnig.textContent = "Добрый вечер человек!!!";
}
if (timeNow > 0 && timeNow < 6) {
   greetnig.textContent = "Добрый ночи человек!!!";
}
if (timeNow > 6 && timeNow < 10) {
   greetnig.textContent = "Добое утро человек!!!";
}
if (timeNow > 11 && timeNow < 18) {
   greetnig.textContent = "Добрый денек человек!!!";
}
//----------------- Здесь мы говорим какой сегондя день!!!
let dayNow = newDate.getDay();
const  days = [
   'Воскресенье',
   'Понедельник',
   'Вторник',
   'Среда',
   'Четверг',
   'Пятница',
   'Суббота'
];

day.textContent = `Сегодня ---  ${days[dayNow]}`;

// ---------- А здесь мы пишем текущее время !!!!!!
time.textContent = `Текущее время блин:  ${newDate.toLocaleTimeString()}`;
// ------ И надо замутить , сколько осталось до НГ! это тут !

let newYearDay = new Date('01, 01, 2022').getTime();
let today = new Date().getTime();
let calc = (newYearDay - today) / 1000;
newYear.textContent = `До НГ праздника осталось   ${Math.floor(calc / 60 / 60 / 24)} деней!`;
