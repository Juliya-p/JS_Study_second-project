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
                let timerValues = Object.values(timer);
                if(timer.timeRemaining > 0){
                    if (timer.hours < 10){
                        timerHours.textContent = '0' + timer.hours;
                        timerMinutes.textContent = timer.minutes;
                        timerSeconds.textContent = timer.seconds;    
                        }   else if (timer.minutes < 10){
                            timerHours.textContent = timer.hours;
                            timerMinutes.textContent = '0' + timer.minutes;
                            timerSeconds.textContent = timer.seconds;            
                        }   else if (timer.seconds < 10){
                            timerHours.textContent = timer.hours;
                            timerMinutes.textContent = timer.minutes;
                            timerSeconds.textContent = '0' + timer.seconds;            
                        }   else {
                            timerHours.textContent = timer.hours;
                            timerMinutes.textContent = timer.minutes;
                            timerSeconds.textContent = timer.seconds;    
                        }
                    setTimeout(updateClock, 1000);
                }   else if (timer.timeRemaining <= 0){
                    timerHours.textContent = '00';
                    timerMinutes.textContent = '00';
                    timerSeconds.textContent = '00';
                }
            }
        updateClock();
    }
    countTimer('11 march 2021');
    
    
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
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupWindow = document.querySelector('.popup-content'),
            width = document.documentElement.clientWidth;
        
        popupWindow.style.transform = `translate(-980px)`;
        console.log(width);
        let modalAnimiation = function(){
            let count = -800;
            setInterval(() => {
                if(count < 0){                
                    popupWindow.style.transform = `translate(${count}px)`;
                    count = count + 40;
                }    else {
                    clearInterval(modalAnimiation);
                }
            }, 30);
        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if(width > 768){
                    popup.style.display = 'block';
                    modalAnimiation();    
                }   else {
                    popup.style.display = 'block';
                    popupWindow.style.transform = `translate(-30px)`;
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopUp();
});