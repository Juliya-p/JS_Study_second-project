window.addEventListener('DOMContentLoaded', () => {

    //таймер
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

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
            const timer = getTimeRemaining();
            const checkNumber = number => (number < 10 ? `0${number}` : `${number}`);
            if (timer.timeRemaining > 0) {
                timerHours.textContent = checkNumber(timer.hours);
                timerMinutes.textContent = checkNumber(timer.minutes);
                timerSeconds.textContent = checkNumber(timer.seconds);
                setTimeout(updateClock, 1000);
            }   else {
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
            menu = document.querySelector('menu');

        const hadlerMenu = () => {
            menu.classList.toggle('active-menu');
            menu.addEventListener('click', event => {
                const target = event.target;
                if (target.classList.contains('close-btn') || target.closest('ul>li>a')) {
                    hadlerMenu();
                }
            });

        };
        btnMenu.addEventListener('click', hadlerMenu);
    };
    toggleMenu();


    //popup

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpWindow = document.querySelector('.popup-content');
        let start = null,
            width = document.documentElement.clientWidth;
        function modalAnimate(timestamp) {
            if (!start) {
                start = timestamp;
            }
            popUpWindow.style.transform = `translate(-980px)`;
            const progress = timestamp - start - 1500;
            popUpWindow.style.transform = `translateX(${Math.min(progress / 2, -30)}px)`;
            if (progress < -100) {
                window.requestAnimationFrame(modalAnimate);
            }   else {
                start = null;
            }
        }

        popUpBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                width = document.documentElement.clientWidth;
                if (width > 768) {
                    popUp.style.display = 'block';
                    window.requestAnimationFrame(modalAnimate);
                }   else {
                    popUp.style.display = 'block';
                    popUpWindow.style.transform = `translate(-30px)`;
                }
            });
        });
        popUp.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            }   else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        });
    };
    togglePopUp();

    // напишем табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }   else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, index) => {
                    if (item === target) {
                        toggleTabContent(index);
                    }
                });
            }
        });
    };
    tabs();


    // добавляю точки
    const dotAdd = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            ulClass = document.querySelector('.portfolio-dots');
        const li = document.createElement('li');
        ulClass.appendChild(li);
        li.setAttribute('class', 'dot');
        for (let i = 0; i < slide.length - 1; i++) {
            const liClone = li.cloneNode();
            ulClass.appendChild(liClone);
        }
    };
    dotAdd();

    //пишем слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        startSlide(1500);
        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            }   else if (target.matches('#arrow-left')) {
                currentSlide--;
            }   else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

    };

    slider();
});
