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
    export default scrolling;