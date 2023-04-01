window.addEventListener('DOMContentLoaded', ()=> {

 const data = { 
      "card1":{
      'src':"img/tabs/vegy.jpg",
      'alt':"vegy",
      'title':'Меню "Фитнес"',
      'descr':'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      'price':9,
      'parentSelector':'.menu .container',
      'menuitem':'menu__item'
    },
    "card2":{
      'src':"img/tabs/elite.jpg",
      'alt':"vegy",
      'title':'Меню "Фитнес"',
      'descr':'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      'price':9,
      'parentSelector':'.menu .container',
      'menuitem':'menu__item'
    },
    "card3":{
      'src':"img/tabs/post.jpg",
      'alt':"vegy",
      'title':'Меню "Фитнес"',
      'descr':'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      'price':9,
      'parentSelector':'.menu .container',
      'menuitem':'menu__item'
    },
  };
  console.log(data);
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

          function hideTabContent(){
            tabsContent.forEach( item => {
                item.style.display = 'none';
            });
            tabs.forEach( item => {
                item.classList.remove('tabheader__item_active');
            });
          }

          function showTabContent(i = 0){
            tabsContent[i].style = 'block';
            tabs[i].classList.add('tabheader__item_active');
          }
          hideTabContent();
          showTabContent();
          
          tabsParent.addEventListener('click', (e)=> {
            const target = e.target;
            
            if(target && target.classList.contains('tabheader__item')){
                tabs.forEach((item, i) => {
                    if(target == item){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
          });

    // Timer

    const deadline = '2023-05-25';

    function getTimeRemaining(endtime){
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());
            if(t <= 0){
              days = 0;
              hours = 0;
              minutes = 0;
              seconds = 0;
            }else{
            //делим общее количество миллисекунд на миллисекунды в сутках 
            //1000мили * 60= в минуте мил сек, 1000мили * 60 * 60 = в часе мил сек
            //, 1000 * 60 * 60 * 24 = в дне мил сек
            //получаем дни сколько осталось до deadline
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60), // t / 1000 = сек/60=мин
            seconds = Math.floor((t / 1000) % 60);
            }

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }

    function getZero(num){
      if(num >= 0 && num < 10){
        return `0${num}`;
      }else {
        return num;
      }
    }

    function setClock(selector , endtime){
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock(){
          const t = getTimeRemaining(endtime);

          days.innerHTML = getZero(t.days);
          hours.innerHTML = getZero(t.hours);
          minutes.innerHTML = getZero(t.minutes);
          seconds.innerHTML = getZero(t.seconds);

          if(t.total <= 0){
            clearInterval(timeInterval);
          }
      }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClosebtn = document.querySelector('[data-close]');

    function openModal(){
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
    });

    function closeModal(){
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    modalClosebtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e)=> {
      if(e.target === modal){
        closeModal();
      }
    });

    document.addEventListener('keydown', (e)=>{
      if(e.code === 'Escape' && modal.classList.contains('show')) closeModal();
    });

    //const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll(){
      if(window.pageYOffset + document.documentElement.clientHeight >= document.
        documentElement.scrollHeight -1){
          openModal();
          window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //классы для карточек 

    class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        console.log(classes);
        this.parent = document.querySelector(parentSelector);
        this.transfer = 70;
        this.changeToRu();
      }

      changeToRu(){
        this.price = this.price * this.transfer;
      }

      render(){
        const element = document.createElement('div');
        if(!this.classes[0]){
          this.element = 'menu__item';
          element.classList.add(this.element);
        }else{
          this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
          </div>
        `;
        this.parent.append(element);
      }

    }

   for(let item in data){
    new MenuCard(data[item].src, data[item].alt, data[item].title, 
      data[item].descr, data[item].price,data[item].parentSelector,data[item].menuitem).render();
   }
});