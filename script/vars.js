export const PLAYFIELD_COLUMNS = 10;
export const PLAYFIELD_ROWS = 20;
export const TETROMINO_NAMES = [
    'O',
    'L',
    'J',
    'S',
    'Z',
    'T',
	'I'
];
export const TETROMINOES = {
	'O':[
		[1,1],
		[1,1]
	
	],
	'L':[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0],
	],
	'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
	],
    'T': [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
	'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
	'Z':[
		[1,0,0],
		[1,1,0],
		[0,1,0],
	]
};
export function getRandomTetromino(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

export function convertPositionIndex(row,column){
	return row * PLAYFIELD_COLUMNS + column;
}
export function getRandomColor(min,max){
	return `rgba(${Math.floor(Math.random() * (max - min + 1)) + min},
	${Math.floor(Math.random() * (max - min + 1)) + min},
	${Math.floor(Math.random() * (max - min + 1)) + min},${1})`;
}
