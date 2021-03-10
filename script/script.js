window.addEventListener('DOMContentLoaded', function(){
    'use strict';

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
                hours = Math.floor( timeRemaining / 60 / 60 ),
                days = Math.floor(timeRemaining / 60 / 60 / 24);
            return{timeRemaining, hours, minutes, seconds};
        }
            function updateClock(){
                let timer = getTimeRemaining();
                let timerItems = [timer.hours, timer.minutes, timer.seconds];
                let timerTextContent = [timerHours, timerMinutes, timerSeconds];
                let timerCheck = () =>{
                    timerItems.forEach((item, index) =>{
                        if (item < 10){
                            item.toString();
                            item = '0' + item;
                        }
                        timerItems[index] = item;
                    });
                };
                timerCheck();
                if(timer.timeRemaining > 0){
                    timerTextContent.forEach((item, index) =>{
                        item.textContent = timerItems[index];
                    });
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
    
    
    //setInterval(countTimer, 1000, '12 march 2025');
});