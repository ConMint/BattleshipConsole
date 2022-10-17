let myGridSize = prompt('What size grid do you want?');
let enemyGridSize = prompt(`What size will your enemy's grid be?`);
let myGrid = createGrid(myGridSize);
let enemyGrid = createGrid(enemyGridSize);
let myShips = 3;
let enemyShips = 3;
enemyLocations = {};

printGrid(enemyGrid, true);
printGrid(myGrid);

for (let i = 1; i < 4; i++) {
  let x = prompt('Enter the x coordinate for ship number' + i);
  let y = prompt('Enter the y coordinate for ship number' + i);
  placeCharacter(x, y, 'O', myGrid);
  placeRandomCharacter('O', enemyGrid, enemyGridSize);
  drawBreak();
}

printGrid(enemyGrid, true);
printGrid(myGrid);

//game loop
while (myShips > 0 && enemyShips > 0) {
  let x = prompt('Enter the x coordinate to attack');
  let y = prompt('Enter the y coordinate to attack');

  if (attack(x, y, enemyGrid)) {
    enemyShips--;
  }
  x = getRandomInt(myGridSize);
  y = getRandomInt(myGridSize);
  if (enemyShips > 0 && attack(x, y, myGrid)) {
    myShips--;
  }
  drawBreak();
  printGrid(enemyGrid, true);
  printGrid(myGrid);
}

if (myShips < enemyShips) {
  console.log('Loser');
} else {
  console.log('WINNA');
}

function createGrid(size) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = '-';
    }
  }
  return grid;
}

function printGrid(grid, isEnemy = false) {
  const headers = createHeaders(grid.length);
  console.log(headers);
  for (let i = 0; i < grid.length; i++) {
    let rowString = i + ' ';
    for (let cell of grid[i]) {
      if (isEnemy && cell == 'O') {
        rowString += '- ';
      } else {
        rowString += cell + ' ';
      }
    }
    console.log(rowString);
  }
}

function createHeaders(size) {
  let result = '  ';
  for (let i = 0; i < size; i++) {
    result += i + ' ';
  }
  return result;
}

function placeCharacter(x, y, c, grid) {
  grid[y][x] = c;
}

function placeRandomCharacter(c, grid, maxsize) {
  let didPlace = false;
  while (!didPlace) {
    let x = getRandomInt(maxsize);
    let y = getRandomInt(maxsize);
    if (!enemyLocations[`${x}-${y}`]) {
      placeCharacter(x, y, c, grid);
      didPlace = true;
      enemyLocations[`${x}-${y}`] = true;
    }
  }
}

function getRandomInt(maxsize) {
  return Math.floor(Math.random() * Math.floor(maxsize));
}

function attack(x, y, grid) {
  if (grid[y][x] == 'O') {
    grid[y][x] = '!';
    return true;
  } else if (grid[y][x] == '-') {
    grid[y][x] = 'x';
    return false;
  } else {
    return false;
  }
}

function drawBreak() {
  console.log('-------------------------------------------------');
}
