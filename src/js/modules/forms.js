function forms() {
   const forms = document.querySelectorAll('form');

   const message = {
      loading: './img/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так'
   };


   forms.forEach(item => {
      bindPostData(item);
   });

   const postData = async (url, data) => {
      const result = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: data
      });
      return await result.json();
   };

   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            width: 50px;
            height: 50px;
            margin: 0 auto;
         `;
         
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form);

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
         .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
         })
         .catch(() => {
            showThanksModal(message.failure);
         })
         .finally(() => {
            form.reset();
         });  
      });
   }

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
         </div>
      `;
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.remove('hide');
         prevModalDialog.classList.add('show');
         closeModal();
      }, 4000);
   }
}

module.exports = forms;