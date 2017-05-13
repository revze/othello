console.clear();

var currentMove = '';
var startGame = '';
var timer = '';

function loadGame() {
  var gameBoard = localStorage.getItem('gameBoard');
  var gameTime = localStorage.getItem('gameTime');
  var gameMove = localStorage.getItem('gameMove');

  if (gameBoard != null && gameTime != null && gameMove != null ) {
    document.getElementById('game').innerHTML = gameBoard;
    startGame = gameTime;
    setInterval(function(){
      document.getElementById('time').innerHTML = Math.round((Date.now() - startGame) / 1000);
    },1000);
    currentMove = gameMove;
  }
}

function saveGame() {
  localStorage.setItem('gameBoard',document.getElementById('game').innerHTML);
  localStorage.setItem('gameTime',Date.now());
  localStorage.setItem('gameMove',currentMove);
}

function getTile(tile) {
  return document.getElementById(tile);
}

function getColor(tile) {
  if (tile.classList.contains('white')) return 'white';
  if (tile.classList.contains('black')) return 'black';
  return '';
}

function inverseColor(color) {
  if (color == 'white') return 'black';
  if (color == 'black') return 'white';
  return '';
}

function setColor(coordinate,color) {
  var tile = document.getElementById(coordinate);
  tile.innerHTML = '';
  var circle = document.createElement('div');
  var circleId = document.createAttribute('id');
  circleId.value = 'circle-'+coordinate;
  circle.className = 'circle';
  circle.setAttributeNode(circleId);

  if (color == 'black') {
    circle.className += ' black';
    tile.appendChild(circle);
    tile.classList.remove(inverseColor(color));
    tile.className += ' black';
    return;
  }

  if (color == 'white') {
    circle.className += ' white';
    tile.appendChild(circle);
    tile.classList.remove(inverseColor(color));
    tile.className += ' white';
    return;
  }

  return;
}

function removeColor(tile,color) {
  tile.classList.remove(color);
  return;
}

function flipTile(tile) {
  var circle = document.getElementById('circle-'+tile);
  circle.classList.remove('flip');
  circle.className += ' flip';
  return;
}

function randomMove() {
  var validLength = document.getElementsByClassName('valid').length;
  var choosenTile = Math.floor(Math.random() * validLength);

  setTimeout(function(){
    document.getElementsByClassName('valid')[choosenTile].click();
  },0);

  return;
}

function checkValid(x,y) {
  var flippedTile = 0;

  getTile('x'+x+'y'+y).classList.remove('valid');

  if (getColor(getTile('x'+x+'y'+y)) != '') return;

  getTile('x'+x+'y'+y).innerHTML = '';

  // Cek kanan
  y1 = y;
  for (var x1 = x + 1; x1 < 8; x1++) {

    var tile = getTile('x'+x1+'y'+y1);
    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      for (; x1 > x; x1--) {

        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        if (color == invColor){
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek kiri
  y1 = y;
  for (var x1 = x - 1; x1 >= 0; x1--) {

    var tile = getTile('x'+x1+'y'+y1);
    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      for (; x1 < x; x1++) {

        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        if (color == invColor){
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek atas
  x1 = x;
  for (var y1 = y - 1; y1 >= 0; y1--) {

    var tile = getTile('x'+x1+'y'+y1);
    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      for (; y1 < y; y1++) {

        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        if (color == invColor){
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek bawah
  x1 = x;
  for (var y1 = y + 1; y1 < 8; y1++) {

    var tile = getTile('x'+x1+'y'+y1);
    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      for (; y1 > y; y1--) {

        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        if (color == invColor){
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek atas kiri
  y1 = y;
  for (var x1 = x - 1; x1 >= 0; x1--) {
    y1--;
    var tile = getTile('x'+x1+'y'+y1);

    if (tile == undefined) break;

    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      y1--;
      for (; x1 < x; x1++) {

        y1++;
        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        if (color == invColor){
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek atas kanan
  y1 = y;
  for (var x1 = x + 1; x1 < 8; x1++) {
    y1--;
    var tile = getTile('x'+x1+'y'+y1);

    if (tile == undefined) break;

    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      y1--;
      for (; x1 > x; x1--) {

        y1++;
        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        if (color == invColor){
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek bawah kiri
  y1 = y;
  for (var x1 = x - 1; x1 >= 0; x1--) {
    y1++;
    var tile = getTile('x'+x1+'y'+y1);

    if (tile == undefined) break;

    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      y1++;
      for (; x1 < x; x1++) {

        y1--;
        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        if (color == invColor){
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek bawah kanan
  y1 = y;
  for (var x1 = x + 1; x1 < 8; x1++) {
    y1++;
    var tile = getTile('x'+x1+'y'+y1);

    if (tile == undefined) break;

    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      y1++;
      for (; x1 > x; x1--) {

        y1--;
        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        if (color == invColor){
          flippedTile++;
        }
      }
      break;
    }
  }

  if (flippedTile == 0) return;

  getTile('x'+x+'y'+y).className += ' valid';
  var circleValid = document.createElement('div');
  circleValid.className = 'circle';
  circleValid.className += ' target';
  circleValid.className += ' '+currentMove;
  getTile('x'+x+'y'+y).appendChild(circleValid);
}

function isEnd() {
  var validTile = document.querySelectorAll('.tile.valid').length;
  var whiteTile = document.querySelectorAll('.tile.white').length;
  var blackTile = document.querySelectorAll('.tile.black').length;
  var gameBoard = document.getElementById('game');

  if (validTile == 0) {

    localStorage.clear();

    if (whiteTile > blackTile) {
      game.innerHTML = '';
      alert('Player win!');
      return;
    }

    if (blackTile == whiteTile) {
      game.innerHTML = '';
      alert('Draw!');
      return;
    }

    if (blackTile > whiteTile) {
      game.innerHTML = '';
      alert('Player lose!');
      return;
    }

    return;
  }
}

function playGame() {

  currentMove = 'white';

  var gameBoard = document.getElementById('game');

  gameBoard.innerHTML = '';

  for (var i = 0; i < 8; i++) {
    var row = document.createElement('div');
    row.className = 'row';

    for (var j = 0; j < 8; j++) {
      var tile = document.createElement('div');
      var tileId = document.createAttribute('id');
      var eventTarget = document.createAttribute('onclick');
      eventTarget.value = 'tileClick('+j+','+i+')';
      tileId.value = 'x'+j+'y'+i;

      tile.className = 'tile';
      tile.setAttributeNode(tileId);
      tile.setAttributeNode(eventTarget);

      row.appendChild(tile);
    }
    gameBoard.appendChild(row);
  }

  setColor('x3y3','black');
  setColor('x4y4','black');
  setColor('x4y3','white');
  setColor('x3y4','white');

  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      checkValid(x,y);
    }
  }

  startGame = Date.now();

  timer = setInterval(function(){
    var timer = Math.round((Date.now() - startGame) / 1000);
    document.getElementById('time').innerHTML = timer;
  },1000);

  saveGame();
}

function tileClick(x,y) {

  var flippedTile = 0;

  // Cek kanan
  y1 = y;
  for (var x1 = x + 1; x1 < 8; x1++) {

    var tile = getTile('x'+x1+'y'+y1);
    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      for (; x1 > x; x1--) {

        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        removeColor(tile,color);
        setColor('x'+x1+'y'+y1,currentMove);

        if (color == invColor){
          flipTile('x'+x1+'y'+y1);
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek kiri
  y1 = y;
  for (var x1 = x - 1; x1 >= 0; x1--) {

    var tile = getTile('x'+x1+'y'+y1);
    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      for (; x1 < x; x1++) {

        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        removeColor(tile,color);
        setColor('x'+x1+'y'+y1,currentMove);

        if (color == invColor){
          flipTile('x'+x1+'y'+y1);
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek atas
  x1 = x;
  for (var y1 = y - 1; y1 >= 0; y1--) {

    var tile = getTile('x'+x1+'y'+y1);
    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      for (; y1 < y; y1++) {

        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        removeColor(tile,color);
        setColor('x'+x1+'y'+y1,currentMove);

        if (color == invColor){
          flipTile('x'+x1+'y'+y1);
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek bawah
  x1 = x;
  for (var y1 = y + 1; y1 < 8; y1++) {

    var tile = getTile('x'+x1+'y'+y1);
    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      for (; y1 > y; y1--) {

        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        removeColor(tile,color);
        setColor('x'+x1+'y'+y1,currentMove);

        if (color == invColor){
          flipTile('x'+x1+'y'+y1);
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek atas kiri
  y1 = y;
  for (var x1 = x - 1; x1 >= 0; x1--) {
    y1--;
    var tile = getTile('x'+x1+'y'+y1);

    if (tile == undefined) break;

    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      y1--;
      for (; x1 < x; x1++) {

        y1++;
        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        removeColor(tile,color);
        setColor('x'+x1+'y'+y1,currentMove);

        if (color == invColor){
          flipTile('x'+x1+'y'+y1);
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek atas kanan
  y1 = y;
  for (var x1 = x + 1; x1 < 8; x1++) {
    y1--;
    var tile = getTile('x'+x1+'y'+y1);

    if (tile == undefined) break;

    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      y1--;
      for (; x1 > x; x1--) {

        y1++;
        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        removeColor(tile,color);
        setColor('x'+x1+'y'+y1,currentMove);

        if (color == invColor){
          flipTile('x'+x1+'y'+y1);
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek bawah kiri
  y1 = y;
  for (var x1 = x - 1; x1 >= 0; x1--) {
    y1++;
    var tile = getTile('x'+x1+'y'+y1);

    if (tile == undefined) break;

    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      y1++;
      for (; x1 < x; x1++) {

        y1--;
        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        removeColor(tile,color);
        setColor('x'+x1+'y'+y1,currentMove);

        if (color == invColor){
          flipTile('x'+x1+'y'+y1);
          flippedTile++;
        }
      }
      break;
    }
  }

  // Cek bawah kanan
  y1 = y;
  for (var x1 = x + 1; x1 < 8; x1++) {
    y1++;
    var tile = getTile('x'+x1+'y'+y1);

    if (tile == undefined) break;

    var color = getColor(tile);

    if (color == '') break;
    if (color == currentMove) {
      y1++;
      for (; x1 > x; x1--) {

        y1--;
        tile = getTile('x'+x1+'y'+y1);
        color = getColor(tile);
        invColor = inverseColor(currentMove);

        removeColor(tile,color);
        setColor('x'+x1+'y'+y1,currentMove);

        if (color == invColor){
          flipTile('x'+x1+'y'+y1);
          flippedTile++;
        }
      }
      break;
    }
  }

  if (flippedTile == 0) {
    alert('Tidak valid cari jalan lain.');
    return;
  }

  setColor('x'+x+'y'+y,currentMove);
  currentMove = inverseColor(currentMove);

  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 8; y++) {
      checkValid(x,y);
    }
  }

  if (currentMove == 'black') {
    randomMove();
  }

  isEnd();
}

loadGame();
