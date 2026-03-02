
const lights = document.querySelectorAll('.light');
function turnOn(color) {
    lights.forEach(light => light.classList.remove('on'));
    document.querySelector('.' + color).classList.add('on');
}