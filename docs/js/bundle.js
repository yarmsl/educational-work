/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
   const res = document.querySelector('.calculating__result span');
   
   let sex, height, weight, age, ratio;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = '1.375';
      localStorage.setItem('ratio', '1.375');
   }
   
   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
         el.classList.remove(activeClass);
         if (el.getAttribute('id') === localStorage.getItem('sex')) {
            el.classList.add(activeClass);
         }
         if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            el.classList.add(activeClass);
         }
      });
   }

   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         res.textContent = 'Заполните все поля';
         return;
      }

      if (sex === 'female') {
         res.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         res.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }
   calcTotal();

   function getStatInfo(selector, active) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
         el.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio');
               localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            elements.forEach(elem => {
               elem.classList.remove(active);
            });
            e.target.classList.add(active);
            calcTotal();
         });
      });
   }
   getStatInfo('#gender div', 'calculating__choose-item_active');
   getStatInfo('.calculating__choose_big div', 'calculating__choose-item_active');

   function getDinInfo(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {

         if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
         } else {
            input.style.border = 'none';
         }

         switch(input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;
            case 'weight':
               weight = +input.value;
               break;
            case 'age':
               age = +input.value;
               break;
         }
      calcTotal();
      });
   }
   getDinInfo('#height');
   getDinInfo('#weight');
   getDinInfo('#age');
   
}

module.exports = calc;

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
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

}

module.exports = cards;

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {

   function addZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

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


   slides.forEach(slide => {
      slide.style.width = width;
      console.log(width);
   });
   
   const indicators = document.createElement('ol'),
        dots = [];
      indicators.classList.add('carousel-indicators');
      slider.append(indicators);

      for (let i = 0; i < slides.length; i++) {
         const dot = document.createElement('li');
         dot.setAttribute('data-slide-to', i + 1);
         dot.classList.add('dot');
         if (i == 0) {
            dot.classList.add('vis');
         }
         indicators.append(dot);
         dots.push(dot);
      }

      const flameDot = (els, i) => {
         els.forEach(el => el.classList.add('glass'));
         els.forEach(el => el.classList.remove('vis'));
         els[i - 1].classList.add('vis');
         els[i - 1].classList.remove('glass');
      };

      function val2num() {
         if (this.indexOf('.') !== -1) {
            return parseFloat(this);
         } else {
            return +this.replace(/\D/g, '');
         }
      }
      String.prototype.val2num = val2num;

   next.addEventListener('click', () => {
      if (offset == width.val2num() * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += width.val2num();
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }
      current.textContent = addZero(slideIndex);

      flameDot(dots, slideIndex);
   });

   prev.addEventListener('click', () => {
      if (offset == 0) {
         offset = width.val2num() * (slides.length - 1);
      } else {
         offset -= width.val2num();
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }
      current.textContent = addZero(slideIndex);

      flameDot(dots, slideIndex);
   });

   dots.forEach(dot => {
      dot.addEventListener('click', e => {
         const slideTo = e.target.getAttribute('data-slide-to');
         slideIndex = slideTo;
         offset = width.val2num() * (slideTo - 1);
         slidesField.style.transform = `translateX(-${offset}px)`;

         current.textContent = addZero(slideIndex);
         flameDot(dots, slideIndex);
      });
   });
}

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
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
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {

   function addZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

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
}

module.exports = timer;

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

document.addEventListener('DOMContentLoaded', () => {
   const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js"),
         modal = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js"),
         timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js"),
         cards = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js"),
         slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js"),
         calc = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js"),
         forms = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");

         tabs();
         modal();
         timer();
         cards();
         slider();
         calc();
         forms();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map