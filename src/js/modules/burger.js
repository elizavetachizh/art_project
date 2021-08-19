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
export default burger;