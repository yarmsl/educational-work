function modal() {
   const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');
  
      function openModal() {
         modal.classList.remove('hide');
         modal.classList.add('show');
         document.body.style.overflow = 'hidden';
         // clearInterval(modalTimerId);
      }

      modalTrigger.forEach(btn => {
         btn.addEventListener('click', openModal);
      });

      function closeModal() {
         modal.classList.remove('show');
         modal.classList.add('hide');
         document.body.style.overflow = '';
      }

      
      modal.addEventListener('click', (e) => {
         if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
         }
      });

      document.addEventListener('keydown', (e) => {
         if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
         }
      });

      const modalTimerId = setTimeout(openModal, 70000);

      function showModalByScroll() {
         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
         }
      }

      window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;