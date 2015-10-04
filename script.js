function setBackground(val) {
    document.body.style.backgroundColor = '#' + val;
}

function setBackgroundHSL(hue, saturation, lightness) {
    var hslVal = 'hsl(' + hue + ',' + saturation + '%,' + lightness +'%)';
    document.body.style.backgroundColor = hslVal;
}

function translate(val, leftMin, leftMax, rightMin, rightMax) {
    var leftSpan = leftMax - leftMin;
    var rightSpan = rightMax - rightMin;
    
    var normVal = (val - leftMin) / leftSpan;
    var translatedVal = rightMin + (normVal * rightSpan);
    
    return Math.floor(translatedVal);
}

function updateClock(hours, minutes, seconds, color) {        
    hoursField.textContent = (hours < 10) ? '0' + hours : hours; // adds padding zeros
    minutesField.textContent = (minutes < 10) ? '0' + minutes : minutes;
    secondsField.textContent = (seconds) < 10 ? '0' + seconds : seconds;
    
    var newHue = (color.hue + 180) % 360; // complementary color
    
    var hslVal = 'hsl(' + newHue  + ',' + 100 + '%,' + 80 +'%)';
    clock.style.color = hslVal;
}

function getHslColor(hours, minutes, seconds) {
    var hue = translate(seconds, 0, 59, 0, 360);
    
    var saturation = translate(
        Math.abs(Math.cos(minutes * Math.PI / 59)), 0, 1, 50, 100
    );
    var lightness = translate(
        Math.abs(Math.sin(hours * Math.PI / 23)), 0, 1, 20, 80
    );
    
    return {
        hue: hue,
        saturation: saturation,
        lightness: lightness
    };
}

function handleTimeChange(time) {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    var color = getHslColor(hours, minutes, seconds);
    updateClock(hours, minutes, seconds, color);
    
    colorField.textContent = 'hsl(' + color.hue + ', ' + 
                                      color.saturation + '%, '+ 
                                      color.lightness + '%)';
    
    console.log(color);
    setBackgroundHSL(color.hue, color.saturation, color.lightness);
}

var hoursField = document.querySelector('.hours');
var minutesField = document.querySelector('.minutes');
var secondsField = document.querySelector('.seconds');
var colorField = document.querySelector('.color');
var clock = document.querySelector('.clock');

setInterval(function() {
    var currentTime = new Date();
    handleTimeChange(currentTime);   
    
}, 1000);


