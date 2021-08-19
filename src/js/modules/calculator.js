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
   export default calc;