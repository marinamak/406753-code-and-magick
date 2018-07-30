'use strict';

var WIZARDS_NUM = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatsColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

function getRandom(arr) {
  return Math.floor(Math.random() * arr.length);
};

function getRandomName(arr1, arr2) {
  var numRandomName = getRandom(arr1);
  var numRandomSurname = getRandom(arr2);
  var randomName = arr1[numRandomName] + ' ' + arr2[numRandomSurname];
  return randomName;
};

function createWizard(wizardsnum) {
  var wizards = [];
  for (var i = 0; i < wizardsnum; i++) {
    var wizard = {};
    wizard.name = getRandomName(WIZARD_NAMES, WIZARD_SURNAMES);
    wizard.coat = coatsColors[getRandom(coatsColors)];
    wizard.eyes = eyesColors[getRandom(eyesColors)];
    wizards.push(wizard);
  };
  return wizards;
};

var wizards = createWizard(WIZARDS_NUM);


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
};
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');



