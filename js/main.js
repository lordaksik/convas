var canvas = document.getElementById('games');
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  canvas.width = 1500
  canvas.height = 720
}
var img = new Image();
img.src = 'img/1700.jpg'
var timer = 100;
var center = 720;
var pressedKeys = {
  KeyA:false,
  KeyW:false,
  KeyD:false,
  KeyE:false
};
var pressedKeys2 = {
  ArrowLeft:false,
  ArrowUp:false,
  ArrowRight:false
};
let player1 = {
  x: 300,
  y: 400
}
let player1Atack = {
  y1: 20,
  y2: 45
}
let player2 = {
  x: 1100,
  y: 400
}

document.addEventListener("keydown", playerFirst);
document.addEventListener("keyup", playerUp);
document.addEventListener("keyup", playerUp2);
document.addEventListener("keydown", playerTwo);

function movePlayr(){
  if (pressedKeys.KeyA===true) {
    if (player1.x > 0) {
      player1.x = player1.x - 2;
    }
  }
  if (pressedKeys.KeyW===true) {
  if (player1.y > 150) {
    player1.y = player1.y - 10;
  }
}
if (pressedKeys.KeyD===true) {
  if (player1.x < 1450) {
    player1.x = player1.x + 2;
  }
}
if (pressedKeys.KeyE===true) {
if (player1Atack.y1 < 115 ) {
    player1Atack.y1 = player1Atack.y1 + 5;
    player1Atack.y2 = player1Atack.y2 + 5;
  }
  else{
    player1Atack.y1=20;
    player1Atack.y2=45;
  }
}
}
function movePlayrTwo(){
  if (pressedKeys2.ArrowLeft===true) {
    if (player2.x > 0) {
      player2.x = player2.x - 2;
    }
  }
  if (pressedKeys2.ArrowUp===true) {
  if (player2.y > 150) {
    player2.y = player2.y - 10;
  }
}
if (pressedKeys2.ArrowRight===true) {
  if (player2.x < 1450) {
    player2.x = player2.x + 2;
  }
}
}
function playerFirst(event) {
  
  if(event.code === 'KeyA') {
      pressedKeys.KeyA = true;
 }
  if (event.code === 'KeyW') {
      pressedKeys.KeyW = true;
  }
  if (event.code === 'KeyD') {
    pressedKeys.KeyD = true;
}
if (event.code === 'KeyE') {
  pressedKeys.KeyE = true;
}
}
function playerUp(event) {
  // console.log(event.code)
  if(event.code === 'KeyA') {
       pressedKeys.KeyA = false;
     }
     if(event.code === 'KeyW') {
      pressedKeys.KeyW = false;
    }
    if(event.code === 'KeyD') {
      pressedKeys.KeyD = false;
    }
    if(event.code === 'KeyE') {
      pressedKeys.KeyE = false;
    }
    }
    
function playerUp2(event) {
  if (event.code === 'ArrowLeft') {
    pressedKeys2.ArrowLeft=false;
  }
  if (event.code === 'ArrowUp') {
    pressedKeys2.ArrowUp=false;
  }
   if (event.code === 'ArrowRight') {
    pressedKeys2.ArrowRight=false;
  }
    }

function playerTwo(event) {
  console.log(event.code)
  if (event.code === 'ArrowLeft') {
    pressedKeys2.ArrowLeft=true;
  }
  if (event.code === 'ArrowUp') {
    pressedKeys2.ArrowUp=true;
  }
   if (event.code === 'ArrowRight') {
    pressedKeys2.ArrowRight=true;
  }
}

function timer() {
        ctx.fillText(time, 730, 60)

}

function draw() {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'OrangeRed';
  ctx.strokeRect(100, 40, 550, 50)
  ctx.fillStyle = 'LawnGreen'; // меняем цвет клеток
  ctx.fillRect(100, 40, 550, 50);

  ctx.strokeStyle = 'OrangeRed';
  ctx.strokeRect(850, 40, 550, 50)
  ctx.fillStyle = 'LawnGreen'; // меняем цвет клеток
  ctx.fillRect(850, 40, 550, 50);

  ctx.font = '50px serif';
  ctx.fillStyle = 'black'
  if (timer < 10) {
    center = 740;
  }
  movePlayr()
  movePlayrTwo()
  ctx.fillText(timer, center, 80);

  ctx.fillStyle = 'red'; // меняем цвет клеток
  if (player1.y < 400) {
    player1.y = player1.y + 3;
  }
 
  ctx.fillRect(player1.x, player1.y, 50, 200);

  ctx.beginPath();
  ctx.moveTo(player1.x+50,player1.y+70);
  ctx.lineTo(player1.x+130,player1.y+player1Atack.y1);
  ctx.lineTo(player1.x+130,player1.y+player1Atack.y2);
  ctx.lineTo(player1.x+50,player1.y+95);
  ctx.fillStyle = 'yellow';
  ctx.fill();
   // меняем цвет клеток
  ctx.closePath()

  ctx.fillStyle = 'yellow'; // меняем цвет клеток
  if (player2.y < 400) {
    player2.y = player2.y + 3;
  }
  ctx.fillRect(player2.x, player2.y, 50, 200);

  requestAnimationFrame(draw)
}

function texts() {
  if (timer > 0) {
    timer--
  }
}
setInterval(texts, 1000)
img.onload = draw;
