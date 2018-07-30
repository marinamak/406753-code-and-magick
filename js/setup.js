'use strict';

//  ---------------Задание 14------------------

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardEyesInput = setup.querySelector('input[name="eyes-color"]');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardCoatInput = setup.querySelector('input[name="coat-color"]');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardFireballInput = setup.querySelector('input[name="fireball-color"]');

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var coatsColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

function getRandom(arr) {
  return Math.floor(Math.random() * arr.length);
};

var getColor = function(arr) {
  var color = arr[getRandom(arr)];
  return color;
};

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function() {
  setup.classList.remove('hidden');
});

setupClose.addEventListener('click', function() {
  closePopup();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var convertRGBtoHEX = function (rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) {
    return rgb;
  } else {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    var hex = (rgb && rgb.length === 4) ? '#' +
      ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    return hex;
  }
};

var changeColor = function(elem, input, arr, bg) {
  var currentColor = elem.style.fill;
  var newColor = getColor(arr);
  var bgCurrrentColor = convertRGBtoHEX(elem.style.backgroundColor);
  if (bg == true) {
    if (bgCurrrentColor == newColor) {
      changeColor(elem, input, arr, bg);
    } else {
      elem.style.backgroundColor = newColor;
    }
  } else {
    if (currentColor == newColor) {
      changeColor(elem, input, arr);
    } else {
      elem.style.fill = newColor;
    }
  }
  input.value = newColor;
};

wizardEyes.addEventListener('click', function() {
  changeColor(wizardEyes, wizardEyesInput, eyesColors);
});

wizardCoat.addEventListener('click', function() {
  changeColor(wizardCoat, wizardCoatInput, coatsColors);
});

wizardFireball.addEventListener('click', function() {
  changeColor(wizardFireball, wizardFireballInput, fireballColors, true);
});
