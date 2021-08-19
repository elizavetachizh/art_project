const pictureSize = (blockSelector) => {
       const blocks=document.querySelectorAll(blockSelector);

       const showInfo = (block) => {
        const image=block.querySelector('img');
          image.src=image.src.replace('.png', '-1.png');
            block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
              item.style.display='none';
        })
       }

       const hideInfo =(block) => {
        const image=block.querySelector('img');
          image.src=image.src.replace('-1.png', '.png');
            block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
              item.style.display='block';
        })
       }

       blocks.forEach(item => {
         item.addEventListener("mouseover", () => {
          showInfo(item);
         })
         item.addEventListener('mouseout', () => {
           hideInfo(item);
         })
       })
     };
export default pictureSize;


