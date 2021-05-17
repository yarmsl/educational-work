'use strict';

document.addEventListener('DOMContentLoaded', () => {
   
   function addZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

//Tabs

   const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items');

   function hideTabcontent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });
      tabs.forEach(tab => {
         tab.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabcontent();
   showTabContent();

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabcontent();
               showTabContent(i);
            }
         });
      }
   });

   //Timer

   const deadline = '2021-05-01';

   function getTimeRemaining(endtime) {
      const t = new Date(endtime) - Date.now(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor( (t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

         updateClock();

            function updateClock() {
               const t = getTimeRemaining(endtime);

               days.innerHTML = addZero(t.days);
               hours.innerHTML = addZero(t.hours);
               minutes.innerHTML = addZero(t.minutes);
               seconds.innerHTML = addZero(t.seconds);

               if (t.total <= 0) {
                  clearInterval(timeInterval);               
               }
            }
   }
   setClock('.timer', deadline);

// Modal

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

      // Класс

      class MenuCard {
         constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.changeToRub();
         }
         changeToRub() {
            this.price = this.price.toLocaleString('ru', { maximumFractionDigits: 0, style: 'currency', currency: 'RUB' });
         }

         renderCard() {
               const element = document.createElement('div');
               if (this.classes.length === 0) {
                  this.element = 'menu__item';
                  element.classList.add(this.element);
               } else {
                  this.classes.forEach(className => {
                     element.classList.add(className);
                  });
               }
 
               element.innerHTML = `
               <img src="${this.src}" alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                   <div class="menu__item-cost">Цена:</div>
                   <div class="menu__item-total"><span>${this.price}</span></div>
               </div>
               `;
               this.parent.append(element);
         }
      }

      const getResources = async url => {
         const result = await fetch(url);
         if (!result.ok) {
            throw new Error(`Couldt fetch ${url}, status: ${result.status}`);
         }
         return await result.json();
      };

      // getResources('http://localhost:3000/menu')
      //    .then(data => {
            // data.forEach(({img, altimg, title, descr, price}) => {
            //    new MenuCard(img, altimg, title, descr, price, '.menu .container').renderCard();
            // });
      //    });


      axios.get('http://localhost:3000/menu')
         .then(data => { 
            data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').renderCard();
            });
         });


      // getResources('http://localhost:3000/menu')
      //    .then(data => createCard(data));

      //    function createCard(data) {
      //       data.forEach(({img, altimg, title, descr, price}) => {
      //          price = price.toLocaleString('ru', { maximumFractionDigits: 0, style: 'currency', currency: 'RUB' });
      //          const element = document.createElement('div');
      //          element.classList.add('menu__item');
      //          element.innerHTML = `
      //          <img src="${img}" alt=${altimg}>
      //          <h3 class="menu__item-subtitle">${title}</h3>
      //          <div class="menu__item-descr">${descr}</div>
      //          <div class="menu__item-divider"></div>
      //          <div class="menu__item-price">
      //              <div class="menu__item-cost">Цена:</div>
      //              <div class="menu__item-total"><span>${price}</span></div>
      //          </div>
      //          `;
      //          document.querySelector('.menu .container').append(element);
      //       });
      //    }


      //forms 

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

   //Слайдер
      function sliderSimple() {
         const slider = document.querySelector('.offer__slider'),
               prev = slider.querySelector('.offer__slider-prev'),
               next = slider.querySelector('.offer__slider-next'),
               current = slider.querySelector('#current'),
               total = slider.querySelector('#total'),
               slides = slider.querySelectorAll('.offer__slide');
         let slideIndex = 1;

               total.textContent = addZero(slides.length);

               switchSlide(slideIndex - 1);

               function showSlides(n) {
                  if (n > slides.length) {
                     slideIndex = 1;
     
                  }
                  if (n < 1) {
                     slideIndex = slides.length;
                  }
                  current.textContent = addZero(slideIndex);
                  slides.forEach(slide => slide.classList.add('hide'));
                  slides[slideIndex - 1].classList.remove('hide');
               }

               function switchSlide(n) {
                  showSlides(slideIndex += n);
               }

               prev.addEventListener('click', () => {
                  switchSlide(-1);
               });

               next.addEventListener('click', () => {
                  switchSlide(1);
               });

      }

      function sliderCarousel() {
         const slider = document.querySelector('.offer__slider'),
               prev = slider.querySelector('.offer__slider-prev'),
               next = slider.querySelector('.offer__slider-next'),
               current = slider.querySelector('#current'),
               total = slider.querySelector('#total'),
               slides = slider.querySelectorAll('.offer__slide'),
               slidesWrapper = slider.querySelector('.offer__slider-wrapper'),
               slidesField = slider.querySelector('.offer__slider-inner'),
               width = window.getComputedStyle(slidesWrapper).width;
         let slideIndex = 1,
            offset = 0;

         total.textContent = addZero(slides.length);
         current.textContent = addZero(slideIndex);
         slidesField.style.width = 100 * slides.length + '%';
         slidesField.style.display = 'flex';
         slidesField.style.transition = '0.5s all';

         slidesWrapper.style.overflow = 'hidden';

         slides.forEach(slide => {
            slide.style.width = width;
         });

         next.addEventListener('click', () => {
            if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
               offset = 0;
            } else {
               offset += +width.slice(0, width.length - 2);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length) {
               slideIndex = 1;
            } else {
               slideIndex++;
            }
            current.textContent = addZero(slideIndex);

         });

         prev.addEventListener('click', () => {
            if (offset == 0) {
               offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            } else {
               offset -= +width.slice(0, width.length - 2);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {
               slideIndex = slides.length;
            } else {
               slideIndex--;
            }
            current.textContent = addZero(slideIndex);
         });


      }
      sliderCarousel();
      // sliderSimple();

});
