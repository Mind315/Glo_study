'use strict';
let books = document.querySelectorAll('.book');
let body = document.querySelector('body');
let bookTitle = document.querySelectorAll('.book h2 a')[4];
let spam = document.querySelector('.adv');
let listBookTwo = books[0].querySelectorAll('li');
let listBookFive = books[5].querySelectorAll('li');
let newChapter = 'Глава 8: За пределами ES6';
 





console.log(bookTitle);

//----------восстановил порядок кнги.
books[0].before(books[1]);
books[5].after(books[2]);
books[4].after(books[3]);
// ----------- замена фона!
body.style.backgroundImage = 'url("./image/adv.jpg")';
//---------исправить заголовок!
bookTitle.textContent = 'Книга 3. this и Прототипы Объектов';
//-----------удалить рекламу!!!
spam.remove();
// ------- Восстановить порядок глав 2 и 5 книге!!
listBookTwo[3].after(listBookTwo[6]);
listBookTwo[6].after(listBookTwo[8]);
listBookTwo[9].after(listBookTwo[2]);
//------------------------------------------
listBookFive[1].after(listBookFive[9]);
listBookFive[4].after(listBookFive[2]);
listBookFive[7].after(listBookFive[5]);
// -------- 6 книга. Доабвить главу в правильное место
document.querySelectorAll('.book ul li')[55].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');//:))