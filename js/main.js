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
    imgMoveLeft: {
        img: run,
        imgXMoveStat: 700,
        imgYMoveStat: 0,
        imgXMove: 700,
        imgYMove: 0,
    },
    imgMoveRight: {
        img: stop,
        imgXMoveStat: 20,
        imgYMoveStat: 0,
        imgXMove: 20,
        imgYMove: 0,
    },
    imgStopLeft: {
        img: stop,
        imgXStop: 700,
        imgYStop: 0,
    },
    imgStopRight: {
        img: run,
        imgXStop: 20,
        imgYStop: 0,
    },
    imgFallLeft: {
        img: stop,
        imgXFall: 700,
        imgYFall: 345 + 230,
    },
    imgFallRight: {
        img: run,
        imgXFall: 10,
        imgYFall: 345 + 230,
    },
    imgAttackRight: {
        img: stop,
        imgXAttack: 350,
        imgYAttack: 345,
        animationAttackRight: 0,
    },
    imgAttackLeft: {
        img: run,
        imgXAttack: 350,
        imgYAttack: 345,
        animationAttackLeft: 0,
    },
    attack: 50,
    attackEnd: true,
    fall: false,
    looksLefts: true,
}

let player2 = {
    x: 1100,
    y: 400,
    height: 220,
    width: 120,
    damage: 0,
    hp: 550,
    looksLefts: true,
}


function animationMove(player, side) {
    var x, y;
    if (!player.fall) {
        if (player.looksLefts) {
            side = run
            x = player.imgMoveLeft.imgXMove;
            y = player.imgMoveLeft.imgYMove;
        } else {
            side = stop
            x = player.imgMoveRight.imgXMove;
            y = player.imgMoveRight.imgYMove;
        }
    } else {
        if (player.looksLefts) {
            side = player.imgFallLeft.img
            x = player.imgFallLeft.imgXFall;
            y = player.imgFallLeft.imgYFall;
        } else {
            side = player.imgFallRight.img
            x = player.imgFallRight.imgXFall;
            y = player.imgFallRight.imgYFall;
        }
    }
    ctx.drawImage(
        side,
        x,
        y + 15,
        80,
        115,
        player.x,
        player.y,
        player.width,
        player.height + 45
    );//x картинки y картинки ширина и высота картинки

    //ctx.fillStyle = "green";
    // ctx.fillRect(player.x, player.y, player.width, player.height);
    speed++

    if (speed % 10 === 0) {

        if (speed !== 30) {
            player.imgMoveLeft.imgXMove += 115;
            player.imgMoveRight.imgXMove += 115;
        } else {
            player.imgMoveLeft.imgXMove = player.imgMoveLeft.imgXMoveStat;
            player.imgMoveRight.imgXMove = player.imgMoveRight.imgXMoveStat;
            speed = 0;
        }
    }

}

function animationAttack(player, side) {
    let imgXAttack, imgYAttack;
    if (player.looksLefts) {
        side = player.imgAttackRight.img
        imgXAttack = player.imgAttackRight.imgXAttack;
        imgYAttack = player.imgAttackRight.imgYAttack;
        if (player.imgAttackRight.animationAttackRight === 1) {
            imgXAttack += 110;
        }
        if (player.imgAttackRight.animationAttackRight === 2) {
            player.imgAttackRight.animationAttackRight = 0;
        }
    } else {
        side = player.imgAttackLeft.img
        imgXAttack = player.imgAttackLeft.imgXAttack;
        imgYAttack = player.imgAttackLeft.imgYAttack;
        if (player.imgAttackLeft.animationAttackLeft === 1) {
            imgXAttack += 110;
        }
        if (player.imgAttackLeft.animationAttackLeft === 2) {
            player.imgAttackLeft.animationAttackLeft = 0;
        }
    }

    ctx.drawImage(
        side,
        imgXAttack,
        imgYAttack + 15,
        110,
        115,
        player.x,
        player.y,
        player.width,
        player.height + 45
    );//x картинки y картинки ширина и высота картинки

    //ctx.fillStyle = "green";
    // ctx.fillRect(player.x, player.y, player.width, player.height);
}

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
        if (player.attackEnd) {
            damage(player, player2)
        }
    }
}

function playerFirstKeyUp(event) {
    if (event.code === 'KeyA') {
        set.delete('KeyA')
    }
    if (event.code === 'KeyW') {
        set.delete('KeyW')
        player.fall = true;
    }
    if (event.code === 'KeyD') {
        set.delete('KeyD')
    }
    if (event.code === 'KeyE') {
        set.delete('KeyE')
        player.attackEnd = true
    }
}

function damage(player, player2) {
    if (player.looksLefts) {
        if (player.x > 20 && player.x < 1350) {
            player.x = player.x + 10;
        }
        if (player.x >= player2.x - player.width && player.y === 400) {
            player2.damage += player.attack;
        }
        if (player.x > 20 && player.x < 1350) {
            player.x = player.x - 10;
        }
        player.imgAttackRight.animationAttackRight++;

    } else {
        if (player.x > 20 && player.x < 1350) {
            player.x = player.x - 10;
        }
        if (player.x <= player2.x + player.width && player.y === 400) {
            player2.damage += player.attack;
        }
        if (player.x > 20 && player.x < 1350) {
            player.x = player.x + 10;
        }
        player.imgAttackLeft.animationAttackLeft++;
    }
    player.attackEnd = false
}

function playerFirstStop(player) {
    var x, y, side;
    if (((set.has('KeyD')) === false &&
        (set.has('KeyA') === false) &&
        (set.has('KeyW') === false) &&
        (set.has('KeyE') === false)) || (set.has('KeyE') === true) && player.fall) {
        if (!player.fall) {
            if (player.looksLefts) {
                side = player.imgStopLeft.img;
                x = player.imgStopLeft.imgXStop;
                y = player.imgStopLeft.imgYStop;
            } else {
                side = player.imgStopRight.img;
                x = player.imgStopRight.imgXStop;
                y = player.imgStopRight.imgYStop;
            }
        } else {
            if (player.looksLefts) {
                side = player.imgFallLeft.img
                x = player.imgFallLeft.imgXFall;
                y = player.imgFallLeft.imgYFall;
            } else {
                side = player.imgFallRight.img
                x = player.imgFallRight.imgXFall;
                y = player.imgFallRight.imgYFall;
            }
        }
        ctx.drawImage(
            side,
            x,
            y + 15,
            80,
            115,
            player.x,
            player.y,
            player.width,
            player.height + 45
        );//x картинки y картинки ширина и высота картинки

        //  ctx.fillStyle = "green";
        //  ctx.fillRect(player.x, player.y, player.width, player.height);
    }
}

function playerMove() {

    if (set.has('KeyA') === true) {
        if (player.x > 0 && (player.x >= player2.x + player2.width + 1 || player.x + player.width <= player2.x)) {
            player.x = player.x - 10;
        } else if (player.x > 0 && player.y + player.height < player2.y + (player2.height / 2) + 1) {
            player.x = player.x - 10;
        }
    }

    if (set.has('KeyW') === true && player.fall === false) {
        if (player.y > 100) {
            player.y = player.y - 15;
        } else {
            player.fall = true
        }


    }
    if (set.has('KeyD') === true) {
        if (player.x < 1350 && (player.x + player.width + 1 <= player2.x || player.x >= player2.x + player2.width)) {
            player.x = player.x + 10;
        } else if (player.x < 1350 && player.x > 0 && player.y + player.height + 1 < player2.y + (player2.height / 2)) {
            player.x = player.x + 10;
        }
    }
    if ((set.has('KeyD') === true) || (set.has('KeyA') === true) || (set.has('KeyW') === true)) {
        animationMove(player);
    }
}

function playerFall(player) {
    if (player.y < 400) {
        player.y = player.y + 7;
    }
    if (player.y + player.height >= 620) {
        player.y = 400;
        player.fall = false
    }
}

function playerRolling(player, player2) {
    if (player.x + player.width / 2 <= player2.x + player2.width / 2 && player.x + player.width > player2.x && player.y + player.height - 120 >= player2.y) {
        player.x = player.x - 10;
    }
    if (player.x + player.width / 2 > player2.x + player2.width / 2 && player.x < player2.x + player2.width && player.y + player.height - 120 >= player2.y) {
        player.x = player.x + 10;
    }
}

function playerSide(player, player2) {
    player.looksLefts = player.x + (player.width / 2) < player2.x + (player2.width / 2);
}

function playerFirstAttack(player) {
    if ((set.has('KeyD') === false) &&
        (set.has('KeyA') === false) &&
        (set.has('KeyW') === false) &&
        (set.has('KeyE') === true) &&
        !player.fall) {
        animationAttack(player)
    }
}

function playerFirstHealths() {
    ctx.strokeStyle = 'OrangeRed';
    ctx.strokeRect(100, 40, 550, 50)
    ctx.fillStyle = 'LawnGreen'; // меняем цвет клеток
    ctx.fillRect(100, 40, 550, 50);
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

function playerTwoHealths(hp, damage) {
    if (damage >= 550) {
        damage = 550;
    }
    ctx.strokeStyle = 'OrangeRed';
    ctx.strokeRect(850, 40, 550, 50)
    ctx.fillStyle = 'LawnGreen'; // меняем цвет клеток
    ctx.fillRect(850 + damage, 40, hp - damage, 50);
}

document.addEventListener("keydown", playerFirst);
document.addEventListener("keyup", playerFirstKeyUp);
document.addEventListener("keydown", playerTwo);
document.addEventListener("keyup", playerUp2);

function draw() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    playerSide(player, player2);
    playerFirstStop(player);
    playerFirstHealths();
    playerTwoHealths(player2.hp, player2.damage);
    ctx.font = '50px serif';
    ctx.fillStyle = 'black'
    if (timers < 10) {
        center = 740;
    }
    playerMove()
    playerFirstAttack(player)
    movePlayerTwo(player2)
    ctx.fillText(timers, center, 80);

    // ctx.fillStyle = 'red'; // меняем цвет клеток
    playerFall(player)
    playerRolling(player, player2)

    // ctx.drawImage(mol, player.imgX,player.imgY,800,1050,player.x, player.y, player.width, player.height);//x картинки y картинки ширина и высота картинки


    ctx.fillStyle = 'yellow'; // меняем цвет клеток
    if (player2.y < 400) {
        player2.y = player2.y + 7;
    }
    if (player2.y + player2.height > 620) {
        player2.y = 400;
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