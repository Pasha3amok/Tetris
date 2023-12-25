import { Tetris } from "./Tetris.js";
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, convertPositionIndex } from "./vars.js";

let requestId;
let timeoutId;
let speed = 1500;
const tetris = new Tetris();
const cells = document.querySelectorAll('.tetris div');

document.addEventListener('keydown', onKeyDown);
moveDown();

function drawTetromino(){
	const nameTetro = tetris.tetromino.name;
	const tetrominoMatrixSize = tetris.tetromino.matrix.length;

	for (let row = 0; row < tetrominoMatrixSize; row++) {
		for(let column = 0; column < tetrominoMatrixSize; column++){
			if(!tetris.tetromino.matrix[row][column]){continue;}
			if (tetris.tetromino.row + row < 0) {continue;}
			const cellIndex = convertPositionIndex(
			tetris.tetromino.row + row, tetris.tetromino.column + column);
			cells[cellIndex].style.backgroundColor = tetris.tetromino.color;
			cells[cellIndex].classList.add(nameTetro);
			
		}
	}
}
function drawPlayField(){
	for(let row = 0; row < PLAYFIELD_ROWS; row++){
		for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
			if(tetris.playfield[row][column] == 0){continue};

			const name = tetris.playfield[row][column];
			const cellIndex = convertPositionIndex(row,column);
		cells[cellIndex].classList.add(name);
		}
	}
}

function draw(){
	cells.forEach(cell => cell.removeAttribute('class'))
	cells.forEach(cell => cell.removeAttribute('style'))
	drawPlayField();
	drawTetromino();
	drawGhost();
}

function onKeyDown(event){
	switch (event.key) {
		case 'ArrowUp':
            tetris.rotateTetramino();
			draw()
            break;
		case 'ArrowDown':
			moveDown();
			draw();
			break;
		case 'ArrowLeft':
			tetris.moveTetrominoLeft();
			draw();
			break;
		case 'ArrowRight':
			tetris.moveTetrominoRight();
			draw();
			break;

		default:
			break;
	}
}

function moveDown() {
	tetris.moveTetrominoDown();
	draw();
	stopLoop();
	startLoop();
	if(tetris.isGameOver){
		gameOver();
	}
}

function startLoop(){
	timeoutId = setTimeout(()=> requestId =  requestAnimationFrame(moveDown), speed)
}

function stopLoop(){
	cancelAnimationFrame(requestId);
	clearTimeout(timeoutId);
}

function drawGhost(){
	const tetrominoMatrixSize = tetris.tetromino.matrix.length;

	for (let row = 0; row < tetrominoMatrixSize; row++) {
		for(let column = 0; column < tetrominoMatrixSize; column++){
			if(!tetris.tetromino.matrix[row][column]){continue;}
			if (tetris.tetromino.ghostRow + row < 0) { continue; }
			const cellIndex = convertPositionIndex(
				tetris.tetromino.ghostRow + row, tetris.tetromino.ghostColumn + column);
			cells[cellIndex].classList.add('ghost');
		}
	
	}
}

function gameOver(){
	stopLoop();
	document.removeEventListener('keydown', onKeyDown);
	gameOverConvey();
}
