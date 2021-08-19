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

export default filter;
