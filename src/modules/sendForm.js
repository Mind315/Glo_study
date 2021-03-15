'use strict';

const sendForm = () => {
   // ---- сообщекния которые будем показывать пользователю
     const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

     const postData = (body) => {
       return fetch('./server.php', {
         method: 'POST',
         headers: {
           'Content-Type': 'multipart/from-data'
         },
         body: JSON.stringify(body)
       });
     };

 // ----------- -----------------очистка инпутов.
     const clearInput = (clearIdForm) => {
        const form = document.getElementById(clearIdForm);
     form.reset();
      
     };
// ---------------------------------------валидация форм
     const validationForm = event => {
     // ------ перенес условия из прошлой валидации
     const target = event.target;
     if (target.name === "user_name" || target.name === "user_message") {
       target.value = target.value.replace(/[^а-я\s-]/gi, "");
     } else if (target.name === "user_phone") {
       target.value = target.value.replace(/[^\d()-]/gi, "");
     } else if (target.name === "user_email") {
       target.value = target.value.replace(/[^a-z@_\-\.!\~\*']/gi, "");
     } else {
       return;
     }
     };

     const actionsForm = (selectedForm) => {
        const form = document.getElementById(selectedForm);
        const statusMessage = document.createElement('div');
        const popup = document.querySelector(".popup");


        statusMessage.style.cssText = 'font-size: 2rem; color: #fff';
  

        form.addEventListener('submit', event => {
           const formData = new FormData(form);
           const body = {};

       
       statusMessage.textContent = '';
       statusMessage.className = 'sk-rotating-plane';
           
           event.preventDefault();
           form.appendChild(statusMessage);

           formData.forEach((val, key) => {
              body[key] = val;
           });

         postData(body)
           .then((response) => {
               if(response.status !== 200) {
                 throw new Error('status network is not 200');
                 
               }
               
               statusMessage.className = '';
                    statusMessage.textContent = successMessage;
                    setTimeout(() =>{
                      popup.style.display = "none";
                   }, 2000);  
                    
                    clearInput(selectedForm);
                  
           })
           .then(setTimeout(() =>{
            statusMessage.textContent = '';
         }, 3000))
         
         
          
           
           .catch((error) => {
             statusMessage.className = '';
               statusMessage.textContent = errorMessage;
               console.error(error);
           })
          
           .then(setTimeout(() =>{
             statusMessage.textContent = '';
          }, 3000));
           
         
        });
        form.addEventListener('input', validationForm);
     };
     actionsForm('form1');
     actionsForm('form2');
     actionsForm('form3');
  };

  export default sendForm;