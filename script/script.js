<!DOCTYPE html>

<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>Timer</title>
</head>

<body>

    <input type="text" name="time" id="time">
    <button id="button-start">Start</button>
    <button id="button-stop">Stop</button>
    <div id="timer"></div>
    
    <div class="timer">
        <span class="hours">11</span>
        <span>:</span>
        <span class="minutes">12</span>
        <span>:</span>
        <span class="seconds">11</span>
    </div>
    <script>
        'use strict';
        let timeMinut;

        const stopBtn = document.getElementById('button-stop');
        let tim = -1;
        function countTimer(deadline) {           
            const
                startBtn = document.getElementById("button-start"),
                timerInput = document.getElementById("time"),
                timerShow = document.getElementById("timer"),
                text = document.getElementById('text'),
                hoursHtml = document.getElementsByClassName('hours')[0],
                minutesHtml = document.getElementsByClassName('minutes')[0],
                secondsHtml = document.getElementsByClassName('seconds')[0];
            function getTimeRemaining() {
                const dateStop = new Date(deadline).getTime(),
                    dateNow = new Date().getTime(),
                    timeRemaining = (dateStop - dateNow) / 1000,
                    seconds = Math.floor(timeRemaining % 60),
                    minutes = Math.floor((timeRemaining / 60) % 60),
                    hours = Math.floor(timeRemaining / 60 / 60) % 24;
                return { timeRemaining, hours, minutes, seconds };
            }

            function updateClock() {
                console.log(1);
                tim = setInterval(updateClock, 1000);

                const timer = getTimeRemaining();
                console.log(timer.timeRemaining);

                const checkNumber = number => (number < 10 ? `0${number}` : `${number}`);
                if (timer.timeRemaining > 0) {
                    hoursHtml.textContent = checkNumber(timer.hours);
                    minutesHtml.textContent = checkNumber(timer.minutes);
                    secondsHtml.textContent = checkNumber(timer.seconds);
                    console.log(timer.hours, ":", timer.minutes, ":", timer.seconds);

                } else {
                    hoursHtml.textContent = '00';
                    minutesHtml.textContent = '00';
                    secondsHtml.textContent = '00';

                }

            }

            stopBtn.addEventListener('click', () => {
                console.log("stop");
                clearInterval(tim);
            });
            startBtn.addEventListener('click', () => {
                updateClock();

            });
        }

        countTimer('3 april 2021');
    </script>

</body>

</html>
