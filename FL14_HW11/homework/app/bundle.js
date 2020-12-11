/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 353:
/***/ ((module) => {

// Module
var code = "<!DOCTYPE html> <html> <head> <title>JS Modules</title> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1,user-scalable=0\"> </head> <body> <header> <button id=\"new_game\">New game</button> <button id=\"clear_game\">Clear game</button> </header> <main class=\"board\" id=\"main\"> <div class=\"cell\"> <div class=\"highlighted_cell\"></div> </div> <div class=\"cell\"> <div class=\"highlighted_cell\"></div> </div> <div class=\"cell\"> <div class=\"highlighted_cell\"></div> </div> <div class=\"cell\"> <div class=\"highlighted_cell\"></div> </div> <div class=\"cell\"> <div class=\"highlighted_cell\"></div> </div> <div class=\"cell\"> <div class=\"highlighted_cell\"></div> </div> <div class=\"cell\"> <div class=\"highlighted_cell\"></div> </div> <div class=\"cell\"> <div class=\"highlighted_cell\"></div> </div> <div class=\"cell\"> <div class=\"highlighted_cell\"></div> </div> </main> <footer> <p id=\"message_player_one\" class=\"playes_message\">m</p> <p id=\"message_player_two\" class=\"playes_message\">m</p> </footer> </body> </html>";
// Exports
module.exports = code;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
"use strict";

;// CONCATENATED MODULE: ./js/Player.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player(name) {
    _classCallCheck(this, Player);

    this.name = name;
    this.score = 0;
    this.sign = null;
  }

  _createClass(Player, [{
    key: "incrementScore",
    value: function incrementScore() {
      this.score++;
    }
  }, {
    key: "clearScore",
    value: function clearScore() {
      this.score = 0;
    }
  }]);

  return Player;
}();


;// CONCATENATED MODULE: ./js/data.js
var sign = ['x', 'o'];
var imgPath = {
  x: 'img/x.jpg',
  o: 'img/o.jpg'
};

;// CONCATENATED MODULE: ./js/Game.js
function Game_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Game_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Game_createClass(Constructor, protoProps, staticProps) { if (protoProps) Game_defineProperties(Constructor.prototype, protoProps); if (staticProps) Game_defineProperties(Constructor, staticProps); return Constructor; }




var Game = /*#__PURE__*/function () {
  function Game() {
    Game_classCallCheck(this, Game);

    this.currentPlayer = null;
    this.players = [];
  }

  Game_createClass(Game, [{
    key: "createPlayer",
    value: function createPlayer(name) {
      var newPlayers = new Player(name);

      if (this.players.length === 0) {
        newPlayers.sign = sign[0];
      } else {
        newPlayers.sign = sign[1];
      }

      this.players.push(newPlayers);
      return newPlayers;
    }
  }, {
    key: "clearScoreAllPlayers",
    value: function clearScoreAllPlayers() {
      this.players.forEach(function (player) {
        return player.clearScore();
      });
    }
  }, {
    key: "setCurrentPlayer",
    value: function setCurrentPlayer() {
      var _this = this;

      var currentPlayer;

      if (this.currentPlayer) {
        currentPlayer = this.players.find(function (item) {
          return item !== _this.currentPlayer;
        });
      } else {
        var randomIndex = Math.floor(Math.random() * 2);
        currentPlayer = this.players[randomIndex];
      }

      this.currentPlayer = currentPlayer;
      return this.currentPlayer;
    }
  }, {
    key: "startGame",
    value: function startGame() {
      var playerOneName = prompt('Insert name of first player');
      var playerTwoName = prompt('Insert name of second player');
      this.createPlayer(playerOneName);
      this.createPlayer(playerTwoName);
      this.setCurrentPlayer();
    }
  }]);

  return Game;
}();


;// CONCATENATED MODULE: ./js/Cell.js
function Cell_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Cell_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Cell_createClass(Constructor, protoProps, staticProps) { if (protoProps) Cell_defineProperties(Constructor.prototype, protoProps); if (staticProps) Cell_defineProperties(Constructor, staticProps); return Constructor; }

var Cell = /*#__PURE__*/function () {
  function Cell(row, column, id) {
    Cell_classCallCheck(this, Cell);

    this.id = id;
    this.row = row;
    this.column = column;
    this.sign = null;
  }

  Cell_createClass(Cell, [{
    key: "setSign",
    value: function setSign(sign) {
      this.sign = sign;
      return this.sign;
    }
  }, {
    key: "clearSign",
    value: function clearSign() {
      this.sign = null;
    }
  }]);

  return Cell;
}();


;// CONCATENATED MODULE: ./js/Board.js
function Board_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Board_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Board_createClass(Constructor, protoProps, staticProps) { if (protoProps) Board_defineProperties(Constructor.prototype, protoProps); if (staticProps) Board_defineProperties(Constructor, staticProps); return Constructor; }



var Board = /*#__PURE__*/function () {
  function Board() {
    Board_classCallCheck(this, Board);

    this.cells = [];
    this.cellsAmount = [1, 2, 3];
    this.lastCellId = 0;
  }

  Board_createClass(Board, [{
    key: "createCell",
    value: function createCell(row, column) {
      this.lastCellId++;
      var newCell = new Cell(row, column, this.lastCellId);
      this.cells.push(newCell);
      return newCell;
    }
  }, {
    key: "createAllCells",
    value: function createAllCells() {
      var _this = this;

      this.cellsAmount.forEach(function (row) {
        _this.cellsAmount.forEach(function (column) {
          _this.createCell(row, column);
        });
      });
    }
  }, {
    key: "clearAllCells",
    value: function clearAllCells() {
      this.cells.forEach(function (cell) {
        return cell.clearSign();
      });
    }
  }, {
    key: "findCellById",
    value: function findCellById(id) {
      return this.cells.find(function (cell) {
        return cell.id === id;
      });
    }
  }, {
    key: "checkCellsState",
    value: function checkCellsState(currentCell) {
      if (currentCell.row + currentCell.column === 4) {
        var diagonalCells = this.cells.filter(function (cell) {
          return cell.row + cell.column === 4 && cell.sign === currentCell.sign;
        });

        if (diagonalCells.length === 3) {
          return diagonalCells;
        }
      }

      if (currentCell.row === currentCell.column) {
        var _diagonalCells = this.cells.filter(function (cell) {
          return cell.row === cell.column && cell.sign === currentCell.sign;
        });

        if (_diagonalCells.length === 3) {
          return _diagonalCells;
        }
      }

      var rowCells = this.cells.filter(function (cell) {
        return cell.row === currentCell.row && cell.sign === currentCell.sign;
      });

      if (rowCells.length === 3) {
        return rowCells;
      }

      var columnCells = this.cells.filter(function (cell) {
        return cell.column === currentCell.column && cell.sign === currentCell.sign;
      });

      if (columnCells.length === 3) {
        return columnCells;
      }

      var allCells = this.cells.filter(function (cell) {
        return !cell.sign;
      });

      if (allCells.length === 0) {
        return [];
      }

      return null;
    }
  }]);

  return Board;
}();


;// CONCATENATED MODULE: ./js/renderNameAndScore.js
function renderNameAndScore(game) {
  var playerOneMessage = document.getElementById('message_player_one');
  playerOneMessage.textContent = "".concat(game.players[0].name, " score:").concat(game.players[0].score);
  var playerTwoMessage = document.getElementById('message_player_two');
  playerTwoMessage.textContent = "".concat(game.players[1].name, " score:").concat(game.players[1].score);
}
;// CONCATENATED MODULE: ./js/renderResult.js

function renderResult(game, gameState, cellButtonsArray) {
  if (Array.isArray(gameState) && gameState.length === 3) {
    gameState.forEach(function (cell) {
      var cellButton = cellButtonsArray.find(function (cellButton) {
        return parseInt(cellButton.id) === cell.id;
      });
      var cellButtonChildren = Array.from(cellButton.children);
      var highlightedCell = cellButtonChildren.find(function (element) {
        return element.className === 'highlighted_cell';
      });
      highlightedCell.classList.add('highlighted_bg');
    });
    game.currentPlayer.incrementScore();
    renderNameAndScore(game);
    setTimeout(function () {
      window.alert("".concat(game.currentPlayer.name, " won!"));
    }, 50);
  } else if (Array.isArray(gameState) && gameState.length === 0) {
    game.clearScoreAllPlayers();
    renderNameAndScore(game);
    setTimeout(function () {
      window.alert("Draw!");
    }, 50);
  }
}
;// CONCATENATED MODULE: ./js/renderCellSign.js

function renderCellSign(cellButton, cell) {
  var img = document.createElement('img');
  img.setAttribute('src', imgPath[cell.sign]);
  cellButton.appendChild(img);
}
;// CONCATENATED MODULE: ./js/gameFlow.js


function gameFlow(board, game) {
  var boardContainer = document.getElementById('main');
  var cellButtons = boardContainer.children;
  var cellButtonsArray = Array.from(cellButtons);

  for (var i = 0; i < cellButtons.length; i++) {
    var id = board.cells[i].id;
    cellButtons[i].id = id;

    cellButtons[i].onclick = function () {
      var cell = board.findCellById(parseInt(this.id));

      if (cell.sign) {
        return;
      }

      var sign = game.currentPlayer.sign;
      cell.setSign(sign);
      renderCellSign(this, cell);
      var gameState = board.checkCellsState(cell);
      setTimeout(function () {
        renderResult(game, gameState, cellButtonsArray);
      }, 30);
      game.setCurrentPlayer();
    };
  }
}
;// CONCATENATED MODULE: ./js/clearBoard.js
function clearBoard(board) {
  board.clearAllCells();
  var boardContainer = document.getElementById('main');
  var cellButtonsArray = Array.from(boardContainer.children);
  cellButtonsArray.forEach(function (cell) {
    var highlightedCell = Array.from(cell.children).find(function (element) {
      return element.classList.contains('highlighted_cell');
    });
    highlightedCell.classList.remove('highlighted_bg');
    var image = Array.from(cell.children).find(function (element) {
      return element.tagName === 'IMG';
    });

    if (image) {
      image.remove();
    }
  });
}
// EXTERNAL MODULE: ./index.html
var index = __webpack_require__(353);
;// CONCATENATED MODULE: ./js/index.js







var game = new Game();
game.startGame();
renderNameAndScore(game);
var board = new Board();
board.createAllCells();
gameFlow(board, game);
var newGame = document.getElementById('new_game');

newGame.onclick = function () {
  board.createAllCells();
  clearBoard(board);
};

var clearGame = document.getElementById('clear_game');

clearGame.onclick = function () {
  board.createAllCells();
  clearBoard(board);
  game.clearScoreAllPlayers();
  renderNameAndScore(game);
};
})();

/******/ })()
;