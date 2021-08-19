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
export default forms;