import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, TETROMINO_NAMES , TETROMINOES, getRandomTetromino, getRandomColor } from "./vars.js";

export class Tetris{
	constructor(){
		this.playfield;
		this.tetromino;
		this.isGameOver = false;
		this.init();
	}

	init(){
		this.generatePlayfield();
		this.generateTetromino();
	}

	generatePlayfield(){
		this.playfield = new Array(PLAYFIELD_ROWS).fill(0)
		.map(()=> new Array(PLAYFIELD_COLUMNS).fill(0))
	}

	generateTetromino(){
		const nameTetro = getRandomTetromino(TETROMINO_NAMES);
		const matrixTetro = TETROMINOES[nameTetro];
	
		const startX = Math.floor((PLAYFIELD_COLUMNS-matrixTetro.length)/2);
		// const startY = -2;
		const startY = 0;

	
		this.tetromino = {
			name: nameTetro,
			matrix: matrixTetro,
			row: startY,
			column: startX,
			ghostColumn: startX,
			ghostRow: startY,
			color: getRandomColor(100,255),
		}
	
		this.calculateGhostPosition();
	}

	rotateTetramino() {
		const tetroSize = this.tetromino.matrix.length;
		const tempMatrix = new Array(tetroSize).fill().map(()=> new Array(tetroSize).fill(0));
		for (let row = 0; row < tetroSize; row++) {
			for (let column = 0; column < tetroSize; column++) {
				tempMatrix[row][column] = this.tetromino.matrix[row][column];
			}
		}
	
		for (let row = 0; row < tetroSize; row++) {
			for (let column = 0; column < tetroSize; column++) {
				this.tetromino.matrix[row][column] = tempMatrix[tetroSize - column - 1][row];
			}
		}
	   
		if (this.isValid()) {
			this.tetromino.matrix = tempMatrix;
		}       
	}

	moveTetrominoDown(){
		this.tetromino.row += 1;
		if(this.isValid()){
			this.tetromino.row -= 1;
			this.placeTetromino();
		}
	}
		
	moveTetrominoLeft(){
		this.tetromino.column -= 1;
		if(this.isValid()){
			this.tetromino.column += 1;
		}
	}
	moveTetrominoRight(){
		this.tetromino.column += 1;
		if(this.isValid()){
			this.tetromino.column -= 1;
		}
	}

	isOutsideOfGameBoard() {
		const matrixSize = this.tetromino.matrix.length;
		for (let row = 0; row < matrixSize; row++) {
			for (let column = 0; column < matrixSize; column++) {
				if(!this.tetromino.matrix[row][column]){continue;}
				if(this.tetromino.column + column < 0 ||
					this.tetromino.column + column >= PLAYFIELD_COLUMNS ||
					this.tetromino.row + row >= this.playfield.length ||
					this.tetromino.row + row < 0){
						return true;
				}
				
			}
			
		}
		return false;
	}
	isOutsideOfTopBoard(row) {
		return this.tetromino.row + row < 0;
	}

	isValid(){
		const matrixSize = this.tetromino.matrix.length;
		for (let row = 0; row < matrixSize; row++) {
			for (let column = 0; column < matrixSize; column++){
				if(!this.tetromino.matrix[row][column]){continue;}
				if(this.isOutsideOfGameBoard()){return true;}
				if(this.hasCollisions()){return true;}
			}
		}
	}

	hasCollisions(){
		const matrixSize = this.tetromino.matrix.length;
		for (let row = 0; row < matrixSize; row++) {
			for (let column = 0; column < matrixSize; column++){
				if(this.tetromino.matrix[row][column] == 0){continue}
				if(this.playfield[this.tetromino.row + row][this.tetromino.column + column]){
					return true;
				}
			}
		}
		return false;
	}

	placeTetromino() {
		const matrixSize = this.tetromino.matrix.length;
		for(let row = 0; row < matrixSize; row++){
			for(let column = 0; column < matrixSize; column++){
				if(!this.tetromino.matrix[row][column]) continue;
				if (this.isOutsideOfTopBoard(row)) {
					this.isGameOver = true;
					return;
				}
				this.playfield[this.tetromino.row + row][this.tetromino.column +
				column] = this.tetromino.name;
			}
		}
		const filledRows = this.findFilledRows();
		this.removeFillRows(filledRows);
		this.generateTetromino();
	}



	removeFillRows(filledRows) {
		filledRows.forEach(row =>{
			this.dropRowsAbove(row);
		})
	}
	findFilledRows(){
		const filledRows = [];
		for(let row = 0; row < PLAYFIELD_ROWS; row++){
			let filledColumns = 0;
			for(let column = 0; column <PLAYFIELD_COLUMNS; column++){
				if(this.playfield[row][column] != 0){
					filledColumns++;
				}
			}
			if(PLAYFIELD_COLUMNS == filledColumns){
				filledRows.push(row);
			}
		}
		return filledRows;
	}
	dropRowsAbove(rowDelete) {
		for (let row = rowDelete; row > 0; row--) {
			this.playfield[row] = this.playfield[row - 1] ;
			
		}
	
		this.playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
	}

	calculateGhostPosition(){
		const tetrominoRow = this.tetromino.row;
		this.tetromino.row++;
		while (this.isValid()) {
			this.tetromino.row++;
		}
		this.tetromino.ghostRow = this.tetromino.row + 15;
		this.tetromino.ghostColumn = this.tetromino.column;
		this.tetromino.row = tetrominoRow;
	}
}



