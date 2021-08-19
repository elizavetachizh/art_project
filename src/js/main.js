
//modal windows

window.addEventListener("DOMContentLoaded", () => {
  function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay=true) {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows=document.querySelectorAll('[data-modal]');
          windows.forEach(item => {
            item.classList.add('animated', 'fadeIn')
          })

          // NEW при окрытии пользователем модального окна принимает значение true
          isOpenModal = false;
    trigger.forEach((item) => {
      item.addEventListener("click", (event) => {
        if (event.target) {
          event.preventDefault();
        }
        //для подарка
        if(!closeClickOverlay) {
          item.remove();
        }
        //если человек пролистал до конца и ни на что не нажал
        isOpenModal=true;

        windows.forEach((item)=> {
          item.style.display='none';
          document.body.style.overflow='';
          document.body.style.marginRight='0px';
        })
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.classList.add("modal-open");
      });
    });
    close.addEventListener("click", () => {
      windows.forEach((item)=> {
        item.style.display='none';
      })
      modal.style.display = "none";
      document.body.style.overflow ='';
      document.body.style.marginRight='0px';
      document.body.classList.remove("modal-open");
    });
    modal.addEventListener("click", (event) => {
      if (event.target === modal && closeClickOverlay ) {
          windows.forEach((item)=> {
            item.style.display='none';
        })
        modal.style.display = "none";
        document.body.style.overflow ='';
        document.body.style.marginRight='0px';
        document.body.classList.remove("modal-open");
      }
    });
  }


  function showModalByTime(selector, time) {
    setTimeout( () => {});
  }

// вычисляем ширину скролла страницы; создаем div-элемент с прокруткой и вычисляем
    // разницу между полной шириной этого элемента и шириной без учета полосы прокрутки
    function calcScrollWidth() {
      let div = document.createElement('div');

      div.style.width = '50px';
      div.style.height = '50px';
      div.style.overflowY = 'scroll';
      div.style.visibility = 'hidden';

      document.body.appendChild(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();

      return scrollWidth;
  }
  
  // открывает модальное окно, если страница прокручена вниз до
// конца и пользователь не открыл ни одного модального окна
function openByScroll(selector) {
  window.addEventListener('scroll', () => {
    // полная высота html-документа, включая скрытую за границами окна браузера
    const documentHeight = document.documentElement.scrollHeight;
    // сколько уже прокручено от начала документа + ширина видимого окна браузера
    const currentHeight = window.pageYOffset + document.documentElement.clientHeight;
    // страница уже прокручена до конца или еще нет?
    const isScrollEnd = Math.abs(documentHeight - currentHeight) < 10;
    // пользователь не открывал модальных окон и страница прокручена до конца
    if (!isOpenModal && isScrollEnd) {
      document.querySelector(selector).click();
      }
  });
  }


  bindModals(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModals(
    ".button-consultation",
    ".popup-consultation",
    ".popup-consultation .popup-close"
  );
  bindModals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', false);
  openByScroll('.fixed-gift', ".popup-gift", '.popup-gift .popup-close', true);

  showModalByTime(".popup-consultation", 60000);
  calcScrollWidth()
  
//});

  



//фильтер фотографий по категориям
//window.addEventListener("DOMContentLoaded", () => {
  const filter = () => {
    const menuWrapper = document.querySelector('.portfolio-menu'),
          menuElems = menuWrapper.querySelectorAll('li'),
          allButton = menuWrapper.querySelector('.all'),
          loveButton = menuWrapper.querySelector('.lovers'),
          chefButton = menuWrapper.querySelector('.chef'),
          girlButton = menuWrapper.querySelector('.girl'),
          guyButton = menuWrapper.querySelector('.guy'),
          grandmotherButton = menuWrapper.querySelector('.grandmother'),
          grandfatherButton = menuWrapper.querySelector('.granddad');
      
    const portfolioWrapper = document.querySelector('.portfolio-wrapper'),
          allItems = portfolioWrapper.querySelectorAll('.all'),
          loveItems = portfolioWrapper.querySelectorAll('.lovers'),
          chefItems = portfolioWrapper.querySelectorAll('.chef'),
          girlItems = portfolioWrapper.querySelectorAll('.girl'),
          guyItems = portfolioWrapper.querySelectorAll('.guy'),
          grandmotherItems = portfolioWrapper.querySelectorAll('.grandmother'),
          grandfatherItems = portfolioWrapper.querySelectorAll('.granddad');
      
    const emptyCollection = document.querySelector('.portfolio-no');
      
    const show = collection => {
      // пустая коллекция — показываем сообщение
      if (collection.length === 0) {
        emptyCollection.style.display = 'block';
      } else {
        emptyCollection.style.display = 'none';
      }
      // сначала скрываем все портреты...
      allItems.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('animated', 'fadeIn');
      });
      // ...потом показываем только нужные
      collection.forEach(item => {
        item.style.display = 'block';
        item.classList.add('animated', 'fadeIn');
      });
      };
      
    allButton.addEventListener('click', () => {
      show(allItems); // все работы
      });
    loveButton.addEventListener('click', () => {
      show(loveItems); // для влюбленных
      });
    chefButton.addEventListener('click', () => {
      show(chefItems); // для шефа
      });
    girlButton.addEventListener('click', () => {
      show(girlItems); // для девушки
      });
    guyButton.addEventListener('click', () => {
      show(guyItems); // для парня
      });
    grandmotherButton.addEventListener('click', () => {
      show(grandmotherItems); // для бабушки
      });
    grandfatherButton.addEventListener('click', () => {
      show(grandfatherItems); // для дедушки
      });
      
      menuWrapper.addEventListener('click', (event) => {
      let target = event.target;
      if (target && target.tagName == 'LI') {
      menuElems.forEach(item => item.classList.remove('active'));
      target.classList.add('active');
        }
      });
    };
  filter();    
//});




//заполнение форм модальных окон
 // window.addEventListener("DOMContentLoaded", () => {
  const forms = () => {
    const form = document.querySelectorAll("form"),
          input = document.querySelectorAll("input:not([type='file']), textarea"),
          phoneInput = document.querySelectorAll('input[name="phone"]'),
          name=document.querySelectorAll('input[name="name"]'),
          allUploads=document.querySelectorAll('input[type="file"]');
  

      phoneInput.forEach(item => {
        item.addEventListener('input', () => {
          item.value=item.value.replace(/\D/, '');
        });
      });
      // //    
      name.forEach(item => {
        item.addEventListener('keydown', (event) => {
          const keys = ['Delete', 'Backspace', 'ArrowLeft', 'ArrowRight'];
          // разрешено использовать Delete, Backspace и стрелки
          if (keys.includes(event.key)) {
              return;
          }
          // разрешено вводить только кириллицу, пробел и дефис
          if (event.key && event.key.search(/[- а-яё]/i) === -1) {
              event.preventDefault();
          }
      });
      item.addEventListener('blur', (event) => {
        // если сработало автозаполнение в браузере
        if (item.value.search(/[^- а-яё]/i) >= 0) {
            item.value = 'Только кириллица!';
            setTimeout(() => item.value = '', 1000);
        }
    });
});


        const message = {
          loaded: 
             "Загрузка...",
          success: 
            "Спасибо! Ожидайте ответа.",
          error: 
            "Что-то пошло не так..",

        };

        // при выборе файла показываем его имя в отдельном div-блоке, как это предусмотено версткой; если имя длинное — обрезаем
        allUploads.forEach((item) => {
          item.addEventListener('input', () => {
          const orig = item.files[0].name, // оригинальное имя
                parts = orig.split('.'), // имя и расширение
                dots = parts[0].length > 10 ? '...' : '.';
                parts[0] = parts[0].length > 10 ? parts[0].substr(0, 10) : parts[0];
          const name = parts[0] + dots + parts[1]; // обрезанное имя
          // показываем имя выбраного файла в div-блоке
          item.previousElementSibling.textContent = name;
          });
        });


// // //     //в данной функции для создания запроса нам понадобятся асинхроные функции, что бы сервер успел принять и
// // //     //  обработать информацию, => применяем ключевое слово , которое нам говрит, что функция асинхронная async
      const postData = async (url, data) => {
        //перед загрузкой данных нам нужно указать пользователю что производится загрузка(loaded)
       // document.querySelector(".status").textContent = message.loaded;
        let result = await fetch(url, {
          method: "POST",
          body: data
        });
        return await result.text();
        //следоватльено тут за счёт away вачале выполняется сама операция, а потом уже выводится какой-то кончный результат
      };
      const clearInput = () => {
        input.forEach((item) => {
          item.value = '';
        });
      };
      allUploads.forEach((item) => {
        item.value='';
        item.previousElementSibling.textContent = 'Файл не выбран';
      })
      

    form.forEach((item) => {
      item.addEventListener('submit', (event) => {
        event.preventDefault();

        let statusMessage = document.createElement('div');
        item.parentNode.appendChild(statusMessage);
        statusMessage.classList.add('status');

        statusMessage.style.display='none';
        // внутрь контейнера помещаем абзац текста и картинку
       let statusText = document.createElement('p');
       statusText.textContent = message.success;
       statusMessage.appendChild(statusText);

// скрываем форму с использованием классов анимации
        item.classList.add('animated', 'fadeOutUp');
        item.addEventListener('animationend', function() {
// чтобы форма не занимала место в модальном окне
        item.style.display = 'none';
        statusMessage.style.display = 'block';
// показываем контейнер с использованием анимации
        statusMessage.classList.add('animated', 'fadeInDown');
      }, {once: true});

// //         //собираем все даанеы из формы , т.е. это все инпуты в одну const? в нашем случае форма - это item
          const formData = new FormData(item);
            postData('src/assets/server.php', formData)
              .then((result) => {
                console.log(result);
                statusMessage.textContent = message.success;
              })
          .catch(() => {statusMessage.textContent = message.error})
          .finally(() => {
            clearInput();
              setTimeout(() => {
              // плавно скрываем контейнер с текстом и картинкой,
              // по окончании анимации — плавно показываем форму
              statusMessage.classList.remove('fadeInDown');
              statusMessage.classList.add('fadeOutUp');
              statusMessage.addEventListener('animationend', function() {
              // удаляем контейнер и плавно показываем форму
                 statusMessage.remove();
              item.style.display = 'block';
              item.classList.remove('fadeOutUp');
              item.classList.add('fadeInDown');
            }, {once:true});
             }, 4000);
        });
      });
    });
  };
    
  forms();
//});


//для телефона
//window.addEventListener("DOMContentLoaded", () => {
  const phones = (selector) => {
    // функция очищает и форматирует ввод номера телефона в поле
    // input, вызывается при событиях blur, focus, input
    function mask(event) {
    let phonePattern = '+375 (__) ___-__-__',
    // здесь будет только цифра(ы) телефонного кода страны
    countryCode = phonePattern.replace(/\D/g, ''),
    // из всего ввода в поле input оставляем только цифры
    onlyDigits = this.value.replace(/\D/g, ''),
    // позиция указателя на текущий символ в onlyDigits
    digitsIndex = 0;
    
    // пользователь еще не ввел ни одной цифры, в этом случае мы устанавливаем значение
    // onlyDigits равным countryCode; это позволит показать в поле ввода подсказку +7 —
    // пользователю будет понятно, что код города вводить не нужно
    if (countryCode.length >= onlyDigits.length) {
    onlyDigits = countryCode;
    }
    
    /*
    * Берем шаблон номера телефона +375 (__) ___-__-__ и проходим по всем символам этой
    * строки. Если очередной символ цифра (код города) или подчеркивание — заменяем его
    * на цифру из onlyDigits. Позицию очередного символа (цифры) из onlyDigits храним в
    * digitsIndex — и смещаем указатель при каждой замене подчеркивания на цифру.
    */
    let phoneValue = phonePattern.replace(/./g, function(a) {
    // если очередной символ является цифрой или подчеркиванием...
    let digitOrUnder = /[_0-9]/.test(a);
    // ...и мы еще не дошли до конца строки onlyDigits
    let notEndDigits = digitsIndex < onlyDigits.length;
    // ...то мы возвращаем очередной символ из onlyDigits
      if (digitOrUnder && notEndDigits) {
    // и смещаем указатель для работы со следующим
        return onlyDigits.charAt(digitsIndex++);
      }
    // если в onlyDigits все символы (то есть цифры) закончились, то
    // все что осталось в шаблоне phonePattern заменяем на пустоту;
      if (digitsIndex >= onlyDigits.length) {
        return '';
}
    // если очередной символ шаблона не был подчеркиваением и символы
    // (цифры) в onlyDigits еще не закончились — значит это пробел или
    // дефис или круглые скобки — их мы возвращаем без изменений
        return a;
    });
    
    // теперь заменяем введенное значение на строку шаблона, в которой мы
    // заменили все подчеркивания на цифры (или пробелы, если цифр мало)
    this.value = phoneValue;
    
    // если поле теряет фокус ввода — убираем из него +7, чтобы стало пустым
    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
        }
      }
    }
    
    let phoneInputs = document.querySelectorAll(selector);
    
    phoneInputs.forEach(input => {
    // перед тем, как пользователь начнет вводить, перемещаем курсор в конец
    input.addEventListener('beforeinput', () => {
      input.setSelectionRange(input.value.length, input.value.length);
    });
    // функция mask очищает и форматирует ввод номера телефона в поле input
      input.addEventListener('input', mask);
      input.addEventListener('focus', mask);
      input.addEventListener('blur', mask);
      });
    };
    phones('[name="phone');
//});
 

//window.addEventListener("DOMContentLoaded", () => {
const showMoreStyles = (buttonSelector, hiddenSelector) => {
  const button = document.querySelector(buttonSelector),
        blocks = document.querySelectorAll(hiddenSelector);
  
  // для красивой анимации при показе ранее скрытых блоков
  blocks.forEach(item => {
    item.classList.add('animated', 'fadeInDown');
  });
  
  button.addEventListener('click', () => {
  // удаляем стили, которые отвечают за скрытие блоков и добавляем стили, которые отвечают за показ блоков
  blocks.forEach(item => {
  item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
  item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
  });
  // саму кнопку удаляем со страницы
  button.remove();
  });
  
  };
  showMoreStyles('.button-styles', '.styles-2')
//});


//slider
//window.addEventListener("DOMContentLoaded", () => {
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
        paused == setInterval(function() {
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

slider('.feedback-slider-item', 'horizontal', '.main-next-btn', '.main-prev-btn')
slider('.main-slider-item', 'vertical')
//});





  //calculator
 //window.addEventListener("DOMContentLoaded", () => {
   const calc=(sizeSelector, materialSelector, optionsSelector, promocodeSelector, resultSelector) => {
    const sizeBlock=document.querySelector(sizeSelector),
          materialBlock=document.querySelector(materialSelector),
          optionsBlock=document.querySelector(optionsSelector),
          promocodeBlock=document.querySelector(promocodeSelector),
          resultBlock=document.querySelector(resultSelector);

      const showSum = () => {
        let size=parseFloat(sizeBlock.value),
            material=parseFloat(materialBlock.value),
            options=parseFloat(optionsBlock.value);

        let sum = Math.round(size * material+options);
        
        if (sizeBlock.value =='0' || materialBlock.value=='0') {
          resultBlcik.textContent='Пожалуйста, выберите размер и материал картины';
        } else if (promocodeBlock.value === 'IWANTPOPART') {
          resultBlock.textContent=Math.round(sum * 0.7);
        } else {
          resultBlock.textContent=sum;
        }

      };

        sizeBlock.addEventListener('change', showSum),
        materialBlock.addEventListener('change', showSum),
        optionsBlock.addEventListener('change', showSum),
        promocodeBlock.addEventListener('input', showSum);
   }

      calc('#size', "#material", '#options', '.promocode', '.calc-price')
 //});
    




//картинки с серыми квадратами
   //window.addEventListener("DOMContentLoaded", () => { 
     const puctureSize =(blockSelector) => {
       const blocks=document.querySelectorAll(blockSelector);

       const showInfo = (block) => {
        const image=block.querySelector('img');
          image.src=image.src.replace('.png', '-1.png');
            block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
              item.style.display='none';
        })
       }

       const hideInfo =(block) => {
        const image=block.querySelector('img');
          image.src=image.src.replace('-1.png', '.png');
            block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
              item.style.display='block';
        })
       }

       blocks.forEach(item => {
         item.addEventListener("mouseover", () => {
          showInfo(item);
         })
         item.addEventListener('mouseout', () => {
           hideInfo(item);
         })
       })
     }
      
     
      puctureSize('.sizes .sizes-block');
    //});


    





    // burger
    //window.addEventListener("DOMContentLoaded", () => { 
    const burger = (burgerIconSelector, burgerMenuSelector) => {
      const icon = document.querySelector(burgerIconSelector),
            menu = document.querySelector(burgerMenuSelector);
  
      const toggle = () => {
          if (getComputedStyle(icon).display != 'none') {
              if (getComputedStyle(menu).display == 'none') {
                  menu.style.display = 'block';
              } else {
                  menu.style.display = 'none';
              }
          }
      };
  
      icon.addEventListener('click', () => {
          toggle();
          
      });
  
      window.addEventListener('resize', () => {
          if (getComputedStyle(icon).display == 'none') {
              menu.style.display = 'none';
          }
      });
  };

  
  burger('.header .burger img', '.header .burger-menu');
//});




//прокрутка страницы, кнопка
//window.addEventListener("DOMContentLoaded", () => {
  const scrollup = (scrollupSelector) => {
    const scrollupButton = document.querySelector(scrollupSelector);

    scrollupButton.style.display = 'none';

    // кнопку прокрутки вверх показываем, когда страница прокручена на два экрана вниз
    window.addEventListener('scroll', () => {
        document.documentElement.scrollTop > document.documentElement.clientHeight * 2 ?
            scrollupButton.style.display = 'block' : scrollupButton.style.display = 'none';
        
    });

    // плавная прокрутка — это последовательность мелких шагов:
    // smoothScrollStep — кол-во пикселей, на которые смещаемся
    // betweenStepDelay — задержка между двумя смещениями, в мс
    const smoothScrollStep = 30, betweenStepDelay = 5;

    scrollupButton.addEventListener('click', function(event) {
        // запрещаем браузеру переход к якорю, будем делать это сами
        event.preventDefault();
        // анонимная функция запускается каждые betweenStepDelay мс,
        // прокручивая страницу на smoothScrollStep пикселей за раз
        let moving = setInterval(function() {
            // на каждом шаге — смещение на smoothScrollStep пикселей
            document.documentElement.scrollTop -= smoothScrollStep;
            // мы наверху страницы, останавливаем плавную прокрутку
            if (Math.round(document.documentElement.scrollTop) === 0) {
                clearInterval(moving);
            }
        }, betweenStepDelay);
    });
};

scrollup('.scroll-up');    
//});



//прокрутка с раницы при клике на категории в  меню
//window.addEventListener("DOMContentLoaded", () => {
  const scrolling = (scrollupSelector) => {
    const scrollupButton = document.querySelector(scrollupSelector),
          allAnchorLinks = document.querySelectorAll('a[href^="#"]');

    // кнопку прокрутки вверх показываем, когда страница прокручена на два экрана вниз
    scrollupButton.style.display = 'none';
    window.addEventListener('scroll', () => {
        document.documentElement.scrollTop > document.documentElement.clientHeight * 2 ? 
            scrollupButton.style.display = 'block':
            scrollupButton.style.display = 'none';
        
    });

    // плавная прокрутка — это последовательность мелких шагов:
    // smoothScrollStep — кол-во пикселей, на которые смещаемся
    // betweenStepDelay — задержка между двумя смещениями, в мс
    const smoothScrollStep = 30, betweenStepDelay = 5;

    allAnchorLinks.forEach(item => {
        item.addEventListener('click', (event) => {
            // запрещаем браузеру переход к якорю, будем делать это сами
            event.preventDefault();

            // на сколько пикселей вниз прокручена страница в данный момент —
            // это начальная позиция, откуда будем начинать плавную прокрутку
            let smoothScrollStart = Math.round(document.documentElement.scrollTop);
            // это элемент, к которому будем плавно прокручивать страницу
            let smoothScrollTarget = document.querySelector(item.hash);
            // это конечная позиция, где плавная прокрутка будет закончена
            let smoothScrollStop = 0;

            
            while (smoothScrollTarget.offsetParent) {
                smoothScrollStop = smoothScrollStop + smoothScrollTarget.offsetTop;
                smoothScrollTarget = smoothScrollTarget.offsetParent;
            }

            smoothScrollStop = Math.round(smoothScrollStop);
            // вызываем функцию, которая выполняет плавную прокрутку
            smoothScroll(smoothScrollStart, smoothScrollStop, item.hash);
        });
        
    })
    

    // функция выполняет плавную прокрутку с позиции start до позиции stop
    const smoothScroll = (start, stop, hash) => {
        // к элементу footer страница в принципе не может быть прокручена, потому что он
        // расположен в самом низу страницы, а мы прокручиваем так, чтобы верх элемента 
        // был вверху окна браузера; в этом случае условие currentScrollTop === stop не
        // сработает — нужно еще одно условие, что мы «забуксовали» на месте
        let previousScrollTop;

        let moving = setInterval(function() {
            // на сколько пикселей вниз прокручена страница в данный момент
            let currentScrollTop = Math.round(document.documentElement.scrollTop);

            // мы на месте, останавливаем плавную прокрутку
            if (currentScrollTop === stop || currentScrollTop === previousScrollTop) {
                clearInterval(moving);
                history.replaceState(
                    history.state,
                    document.title, 
                    location.href.replace(/#.*$/g, '') + hash
                );
                return;
            }

            // за шаг мы смещаемся на smoothScrollStep, но когда мы уже близко к
            // цели, может потребоваться смещение меньше, чем smoothScrollStep
            let step = smoothScrollStep;
            if (Math.abs(currentScrollTop - stop) < smoothScrollStep) {
                step = Math.abs(currentScrollTop - stop);
            }

            // на каждом шаге — смещение на step пикселей вниз или вверх
            stop > start ? document.documentElement.scrollTop += step: // прокрутка вниз
              document.documentElement.scrollTop -= step; // прокрутка вверх
            
            // дополнительное условие остановки прокрутки для элемента footer
            previousScrollTop = currentScrollTop;
        }, betweenStepDelay);
    };
};
    scrolling('.scroll-up')
//});



//accordion questions and answers
    //window.addEventListener("DOMContentLoaded", () => {
      function bindAccordion(triggerSelector, accordionSуlector) {
          const trigger=document.querySelectorAll(triggerSelector),
                accordion=document.querySelectorAll(accordionSуlector);
          trigger.forEach((item) => {
            item.addEventListener("click", () => {
              setTimeout(() => {
                accordion.forEach(content => {
                  content.style.display='none';
                });
                item.nextElementSibling.style.display='block';
                }, 300)
              })
             

            })
            accordion.forEach((item)=> {
            
              item.classList.add('animated', 'fadeInDown');
            
                item.style.display='none';
            

                })
              
              }
      bindAccordion('#accordion .accordion-heading',' #accordion .accordion-block')
  });





