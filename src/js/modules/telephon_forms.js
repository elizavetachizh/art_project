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
export default phones;