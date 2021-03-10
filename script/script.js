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
            menu = document.querySelector('menu');

        const hadlerMenu = () => {
            menu.classList.toggle('active-menu');
            menu.addEventListener('click', (event) =>{
                let target = event.target;
                if (target.classList.contains('close-btn') || target.closest('ul')){
                    hadlerMenu();
                }
            });
    
        };
        btnMenu.addEventListener('click', hadlerMenu);
    };
    toggleMenu();


    //popup

    const togglePopUp = () =>{
        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpWindow = document.querySelector('.popup-content'),
            width = document.documentElement.clientWidth;
        
        let modalAnimiation = function(){
            let count = -800;
            popUpWindow.style.transform = `translate(-980px)`;
            setInterval(() => {
                if (count < -20){
                    popUpWindow.style.transform = `translate(${count}px)`;
                    count = count + 10;
                }
            }, 8);
        };

        popUpBtn.forEach((elem) => {
            elem.addEventListener('click' , (event) =>{
                let target = event.target;
                console.log(target);
                if(width > 768){
                    popUp.style.display = 'block';
                    modalAnimiation();    
                }   else {
                    popUp.style.display = 'block';
                    popUpWindow.style.transform = `translate(-30px)`;
                }
            });
        });

        popUp.addEventListener('click', (event) =>{
            let target = event.target;
            console.log(target);
            if (target.classList.contains('popup') || target.classList.contains('popup-close')){
                popUp.style.display = 'none';
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