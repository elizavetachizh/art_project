  const slider = (slideSelector, direction, prevSelector, nextSelector) => {

    let index = 1, paused = false;
    const items = document.querySelectorAll(slideSelector);

    // инициализация слайдера сразу после загрузки страницы
    showSlide(index);

    // запускаем автоматическую смену слайдов после загрузки страницы
    autoplay();

    // когда мышь над слайдером — останавливаем автоматическую прокрутку
    items[0].parentNode.addEventListener('mouseenter', () => {
      clearInterval(paused);
    });
    // когда мышь покидает пределы слайдера — опять запускаем прокрутку
    items[0].parentNode.addEventListener('mouseleave', () => {
      autoplay();
    });

    // обработчики событий клика по кнопкам «вперед» и «назад»
    try {
      const prevButton = document.querySelector(prevSelector),
            nextButton = document.querySelector(nextSelector);

      prevButton.addEventListener('click', () => {
        nextPrevSlide(-1);
        items[index - 1].classList.remove('slideInLeft');
    // следующий слайд плавно выезжает справа
        items[index - 1].classList.add('slideInRight');
      });

      nextButton.addEventListener('click', () => {
        nextPrevSlide(1);
        items[index - 1].classList.remove('slideInRight');
    // следующий слайд плавно выезжает слева
        items[index - 1].classList.add('slideInLeft');
      });
    } catch(e) {
    console.log('У этого слайдера нет кнопок вперед и назад')
    }

    // скрыть все слайды и показать слайд с номером number
    function showSlide(number) {
      if (number > items.length) {
        index = 1;
    }
      if (number < 1) {
        index = items.length;
    }
    // скрыть все слайды...
    items.forEach(item => {
      item.classList.add('animated');
      item.style.display = 'none';
    });
    // ...и показать текущий
    items[index - 1].style.display = 'block';
    }

    // переход к следующему слайду при клике на кнопке «вперед» и «назад»
    function nextPrevSlide(n) {
    showSlide(index = index + n);
    }

    // автоматическая смена слайдов, когда мышь за пределами слайдера
    function autoplay() {
      if (direction === 'vertical') {
        paused === setInterval(function() {
          nextPrevSlide(1);
          items[index - 1].classList.add('slideInDown');
        }, 3000)
      } else {
        paused = setInterval(function() {
          nextPrevSlide(1);
          items[index - 1].classList.remove('slideInRight');
          items[index - 1].classList.add('slideInLeft');
        }, 4000);
      }
    }
  };
export default slider;
