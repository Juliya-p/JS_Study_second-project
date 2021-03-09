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
                console.log(dateNow);
            return{timeRemaining, hours, minutes, seconds};
        }
            function updateClock(){
                let timer = getTimeRemaining();
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
    countTimer('19 march 2022');
    
    
    //setInterval(countTimer, 1000, '12 march 2025');
});