'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var FONT_GAP = 16;

var getMaxElement = function(arr) {
  if (arr.length > 0) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  }
};

var getRandomTransparency = function(r, g, b) {
  var j = Math.random() + 0.1;
  var color = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + j.toFixed(1) + ')';
  if (j >= 1) {
    j = Math.random() - 0.1;
  }
  return color;
};

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, NAMES, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', 40 + CLOUD_WIDTH / 2, 35);
  ctx.fillText('Список результатов:', 30 + CLOUD_WIDTH / 2, 50);

  var maxTime = getMaxElement(times);

  for(var i = 0; i < NAMES.length; i++) {
    if (NAMES[i] == 'Вы') {
      ctx.fillStyle = '#000';
      ctx.fillText(NAMES[i], CLOUD_X + 2 * GAP + i * (BAR_WIDTH + BAR_GAP), CLOUD_HEIGHT - GAP);
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + 2 * GAP + i * (BAR_WIDTH + BAR_GAP), CLOUD_HEIGHT - 2 * GAP -FONT_GAP, BAR_WIDTH, -1 * ((BAR_HEIGHT * times[i]) / maxTime));
    } else {
      ctx.fillStyle = '#000';
      ctx.fillText(NAMES[i], CLOUD_X + 2 * GAP + i * (BAR_WIDTH + BAR_GAP), CLOUD_HEIGHT - GAP);
      ctx.fillStyle = getRandomTransparency(0, 0, 139);
      ctx.fillRect(CLOUD_X + 2 * GAP + i * (BAR_WIDTH + BAR_GAP), CLOUD_HEIGHT - 2 * GAP -FONT_GAP, BAR_WIDTH, -1 * ((BAR_HEIGHT * times[i]) / maxTime));
    }
  }
};


