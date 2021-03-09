
const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const date = new Date();
const hours = date.getHours();
console.log(hours);
(hours > 6 && hours < 12) ? document.write('Доброе утро') : (hours > 12 && hours < 18) ?
    document.write('Добрый день') : (hours > 18 && hours < 24) ?
        document.write('Добрый вечер') : document.write('Доброй ночи');
document.write('<br/>');
document.write('Сегодня: ' + days[date.getDay()] + '<br/>');
     
document.write('Текущее время: ' + date.toLocaleTimeString('en'));
document.write('<br/>');
const dateNY = new Date('01 january 2022');
const dateLeft = (dateNY.getTime() - date.getTime()) / 1000 / 60 / 60 / 24;
document.write('До нового года осталось: ' + Math.floor(dateLeft) + ' days');
