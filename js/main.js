var canvas = document.getElementById('games');
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    canvas.width = 1500
    canvas.height = 720
}
let hp = 550;
let set = new Set();
var img = new Image();
img.src = 'img/fon.png'
var timers = 100;
var center = 720;
var speed = 0;
var win1 = false;
var win2 = false;
var run = new Image()
var stop = new Image()
run.src = 'img/run_right.png'
stop.src = 'img/right.png'
let player = {
    x: 300,
    y: 400,
    height: 220,
    width: 120,
    imgXMove: 700,
    imgYMove: 0,
    imgXAttack: 350,
    imgYAttack: 345,
    xe: 0,
    xy: 0,
    stopX: 100,
    stopY: 100,
    attack: 50,
}

let player2 = {
    x: 1100,
    y: 400,
    height: 220,
    width: 120,
    damage: 0,
    hp: 550,
}
var test = 0;

function animationMove(player, side) {
    ctx.drawImage(
        side,
        player.imgXMove + player.xe,
        player.imgYMove + player.xy,
        110,
        115,
        player.x,
        player.y,
        player.width,
        player.height
    );//x картинки y картинки ширина и высота картинки

    speed++

    player.xe = 0;
    player.xy = 0;
    player.stopY = 0;
    if (speed % 10 === 0) {
        if (speed !== 30) {
            player.imgXMove += 100;
        } else {
            player.imgXMove = 700;
            speed = 0;
        }
    }

}

function animationAttack(player, side) {
    let imgXAttack = player.imgXAttack;
    let imgYAttack = player.imgYAttack;

    if (test === 1) {
        imgXAttack += 100;
    }
    if (test === 2) {
        test = 0;
    }

    ctx.drawImage(
        side,
        imgXAttack,
        imgYAttack,
        110,
        115,
        player.x,
        player.y,
        player.width,
        player.height
    );//x картинки y картинки ширина и высота картинки

}

document.addEventListener("keydown", playerFirst);
document.addEventListener("keyup", playerFirstKeyUp);
document.addEventListener("keydown", playerTwo);
document.addEventListener("keyup", playerUp2);

function texts() {
    if (timers > 0 && !win1 && !win2) {
        timers--
    }
}

function playerFirst(event) {


    if (event.code === 'KeyA') {
        set.add('KeyA')
    }
    if (event.code === 'KeyW') {
        set.add('KeyW')
    }
    if (event.code === 'KeyD') {
        set.add('KeyD')
    }
    if (event.code === 'KeyE') {
        set.add('KeyE')
        if (player.x > 20 && player.x < 1350) {
            player.x = player.x + 10;
        }
    }
}

function playerFirstKeyUp(event) {
    if (event.code === 'KeyA') {
        set.delete('KeyA')
    }
    if (event.code === 'KeyW') {
        set.delete('KeyW')
    }
    if (event.code === 'KeyD') {
        set.delete('KeyD')
    }
    if (event.code === 'KeyE') {
        set.delete('KeyE')

        if (player.x > player2.x - player.width) {
            player2.damage += player.attack;
        }
        if (player.x > 20 && player.x < 1350) {
            player.x = player.x - 10;
        }
        test++;
    }
}

function playerFirstStop() {

    if ((set.has('KeyD')) === false && (set.has('KeyA') === false) && (set.has('KeyW') === false) && (set.has('KeyE') === false)) {
        ctx.drawImage(
            stop,
            player.imgXMove,
            player.imgYMove,
            110,
            115,
            player.x,
            player.y,
            player.width,
            player.height
        );//x картинки y картинки ширина и высота картинки

    }
}

function playerMove() {

    if (set.has('KeyA') === true) {
        if (player.x > 0 && (player.x >= player2.x + player2.width+10 || player.x+player.width <= player2.x )) {
            player.x = player.x - 10;
        } else if (player.x > 0 && player.y + player.height < player2.y+10) {
            player.x = player.x - 10;
        }
    }

    if (set.has('KeyW') === true) {
        if (player.y > 150) {
            player.y = player.y - 15;

        }

    }
    if (set.has('KeyD') === true) {
        if (player.x < 1350 && (player.x+player.width+10 <= player2.x || player.x >= player2.x + player2.width)) {
            player.x = player.x + 10;
        } else if ( player.x > 0 && player.y + player.height+10 < player2.y) {
            player.x = player.x + 10;
        }
    }
    if ((set.has('KeyD') === true) || (set.has('KeyA') === true) || (set.has('KeyW') === true)) {
        animationMove(player, run);
    }
}

function playerFirstAttack(player, side) {

    if ((set.has('KeyD')) === false && (set.has('KeyA') === false) && (set.has('KeyW') === false) && (set.has('KeyE') === true)) {
        animationAttack(player, side)

    }

}

function playerTwo(event) {

    if (event.code === 'KeyJ') {
        set.add('KeyJ')
    }
    if (event.code === 'KeyI') {
        set.add('KeyI')
    }
    if (event.code === 'KeyL') {
        set.add('KeyL')
    }
}

function playerUp2(event) {
    if (event.code === 'KeyJ') {
        set.delete('KeyJ');
    }
    if (event.code === 'KeyI') {
        set.delete('KeyI');
    }
    if (event.code === 'KeyL') {
        set.delete('KeyL');
    }
}


function movePlayerTwo(player) {
    if (set.has('KeyJ') === true) {
        if (player.x > 0) {
            player.x = player.x - 5;
        }
    }
    if (set.has('KeyI') === true) {
        if (player.y > 150) {
            player.y = player.y - 10;
        }
    }
    if (set.has('KeyL') === true) {
        if (player.x < 1450) {
            player.x = player.x + 5;
        }
    }
}

function playerFirstHealths() {
    ctx.strokeStyle = 'OrangeRed';
    ctx.strokeRect(100, 40, 550, 50)
    ctx.fillStyle = 'LawnGreen'; // меняем цвет клеток
    ctx.fillRect(100, 40, 550, 50);
}

function playerTwoHealths(hp, damage) {
    if (damage >= 550) {
        damage = 550;
    }
    ctx.strokeStyle = 'OrangeRed';
    ctx.strokeRect(850, 40, 550, 50)
    ctx.fillStyle = 'LawnGreen'; // меняем цвет клеток
    ctx.fillRect(850 + damage, 40, hp - damage, 50);
}

function draw() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    playerFirstStop();
    playerFirstHealths();
    playerTwoHealths(player2.hp, player2.damage);


    ctx.font = '50px serif';
    ctx.fillStyle = 'black'
    if (timers < 10) {
        center = 740;
    }
    playerMove()
    playerFirstAttack(player, stop)
    movePlayerTwo(player2)
    ctx.fillText(timers, center, 80);

    // ctx.fillStyle = 'red'; // меняем цвет клеток
    if (player.y < 400) {
        player.y = player.y + 7;
    }
    // ctx.drawImage(mol, player.imgX,player.imgY,800,1050,player.x, player.y, player.width, player.height);//x картинки y картинки ширина и высота картинки


    ctx.fillStyle = 'yellow'; // меняем цвет клеток
    if (player2.y < 400) {
        player2.y = player2.y + 3;
    }
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    requestAnimationFrame(draw)
    if (player2.damage + 10 >= hp && !win1) {
        alert('игрок 1 выиграл')
        win1 = true
    }
}


setInterval(texts, 1000)


img.onload = draw;