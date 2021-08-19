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
export default scrollup;