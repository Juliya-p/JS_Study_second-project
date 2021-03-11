window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    //таймер
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor( timeRemaining / 60 / 60 ) % 24,
                days = Math.floor(timeRemaining / 60 / 60 / 24);
            return{timeRemaining, hours, minutes, seconds};
        }
        function updateClock(){
            let timer = getTimeRemaining();
            const checkNumber = number => number < 10 ? `0${number}` : `${number}`;
            if(timer.timeRemaining > 0){
                timerHours.textContent = checkNumber(timer.hours);
                timerMinutes.textContent = checkNumber(timer.minutes);
                timerSeconds.textContent = checkNumber(timer.seconds);
                setTimeout(updateClock, 1000);
            }   else{
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
    updateClock();
}
countTimer('12 march 2021');

    
    //меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const hadlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', hadlerMenu);
        closeBtn.addEventListener('click', hadlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', hadlerMenu));
    };
    toggleMenu();


    //popup

    const togglePopUp = () =>{
        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close'),
            popupWindow = document.querySelector('.popup-content'),
            width = document.documentElement.clientWidth;
        
        popupWindow.style.transform = `translate(-980px)`;
        let modalAnimiation = function(){
            let count = -800;
            setInterval(() => {
                if (count < -20){
                    popupWindow.style.transform = `translate(${count}px)`;
                    count = count + 10;
                }
            }, 8);
        };

        popUpBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if(width > 768){
                    popUp.style.display = 'block';
                    modalAnimiation();    
                }   else {
                    popUp.style.display = 'block';
                    popupWindow.style.transform = `translate(-30px)`;
                }
            });
        });
        popUp.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popUp.style.display = 'none';
            }   else {
                target = target.closest('.popup-content');
                if(!target){
                    popUp.style.display = 'none';
                }    
            }
        });
    };
    togglePopUp();

    // напишем табы 

    const tabs = () =>{
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++){
                if (index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }   else{
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');
            if(target){
                tab.forEach((item, index) =>{
                    if (item === target){
                        toggleTabContent(index);
                    }
                });
            }
        });



    };
    tabs();
});