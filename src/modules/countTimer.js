'use strict';
function countTimer(deadline) {
   let timerHours = document.querySelector("#timer-hours"),
     timerMinutes = document.querySelector("#timer-minutes"),
     timerSeconds = document.querySelector("#timer-seconds");
   let timerId;

   function getTimeRemaining() {
     let dateStop = new Date(deadline).getTime(),
       dateNow = new Date().getTime(),
       timeRemaining = (dateStop - dateNow) / 1000,
       seconds = Math.floor(timeRemaining % 60),
       minutes = Math.floor((timeRemaining / 60) % 60),
       hours = Math.floor(timeRemaining / 60 / 60) % 24;

     return {
       timeRemaining,
       hours,
       minutes,
       seconds,
     };
   }

   function zeroBefore(item) {
     if (item < 10) {
       item = `0${item}`;
     }
     return item;
   }

   function updateClock() {
     let timer = getTimeRemaining();

     timerHours.textContent = zeroBefore(timer.hours);
     timerMinutes.textContent = zeroBefore(timer.minutes);
     timerSeconds.textContent = zeroBefore(timer.seconds);
     // if(timer.timeRemaining > 0) {
     //    setTimeout(updateClock, 1000);
     // }
     if (timer.timeRemaining > 0) {
       console.log();
     } else {
       clearInterval(timerId);
       timerHours.textContent = "00";
       timerMinutes.textContent = "00";
       timerSeconds.textContent = "00";
     }
   }
   updateClock();
   timerId = setInterval(updateClock, 1000);
 }

 export default countTimer;