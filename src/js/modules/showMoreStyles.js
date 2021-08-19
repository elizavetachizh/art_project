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
export default showMoreStyles;