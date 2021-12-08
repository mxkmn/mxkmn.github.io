var startPoint = {};
var nowPoint;
var ldelay;
document.addEventListener('touchstart', function (event) {
    event.preventDefault();
    event.stopPropagation();
    startPoint.x = event.changedTouches[0].pageX;
    startPoint.y = event.changedTouches[0].pageY;
    ldelay = new Date();
}, false);
/*Ловим движение пальцем*/
document.addEventListener('touchmove', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var otk = {};
    nowPoint = event.changedTouches[0];
    otk.x = nowPoint.pageX - startPoint.x;
    /*Обработайте данные*/
    /*Для примера*/
    if (Math.abs(otk.x) > 200) {
        if (otk.x < 0) {/*СВАЙП ВЛЕВО(ПРЕД.СТРАНИЦА)*/ }
        if (otk.x > 0) {/*СВАЙП ВПРАВО(СЛЕД.СТРАНИЦА)*/ }
        startPoint = { x: nowPoint.pageX, y: nowPoint.pageY };
    }
}, false);
/*Ловим отпускание пальца*/
document.addEventListener('touchend', function (event) {
    var pdelay = new Date();
    nowPoint = event.changedTouches[0];
    var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
    var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
    if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime() - ldelay.getTime()) < 200) {
        if (xAbs > yAbs) {
            if (nowPoint.pageX < startPoint.x) {/*СВАЙП ВЛЕВО*/ }
            else {/*СВАЙП ВПРАВО*/ }
        }
        else {
            if (nowPoint.pageY < startPoint.y) {/*СВАЙП ВВЕРХ*/ }
            else {/*СВАЙП ВНИЗ*/ }
        }
    }
}, false);