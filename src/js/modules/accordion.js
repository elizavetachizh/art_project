const bindAccordion  = (triggerSelector, accordionSelector) => {
        const trigger=document.querySelectorAll(triggerSelector),
            accordion=document.querySelectorAll(accordionSelector);
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
};
export default bindAccordion;