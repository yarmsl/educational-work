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