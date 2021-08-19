const modules = () => {
    function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]');
        windows.forEach(item => {
            item.classList.add('animated', 'fadeIn')
        })

        // NEW при окрытии пользователем модального окна принимает значение true
         let isOpenModal = false;
        trigger.forEach((item) => {
            item.addEventListener("click", (event) => {
                if (event.target) {
                    event.preventDefault();
                }
                //для подарка
                if (!closeClickOverlay) {
                    item.remove();
                }
                //если человек пролистал до конца и ни на что не нажал
                isOpenModal = true;

                windows.forEach((item) => {
                    item.style.display = 'none';
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                })
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.classList.add("modal-open");
            });
        });
        close.addEventListener("click", () => {
            windows.forEach((item) => {
                item.style.display = 'none';
            })
            modal.style.display = "none";
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
            document.body.classList.remove("modal-open");
        });
        modal.addEventListener("click", (event) => {
            if (event.target === modal && closeClickOverlay) {
                windows.forEach((item) => {
                    item.style.display = 'none';
                })
                modal.style.display = "none";
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
                document.body.classList.remove("modal-open");
            }
        });
    }


    function showModalByTime(selector, time) {
        setTimeout(() => {
        });
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
}
  export default modules;