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
var win1 = false;
var win2 = false;
var width = 0
var height = 0
var run = new Image()
var stop = new Image()
var lightning = new Image()
run.src = 'img/run_right.png'
stop.src = 'img/right.png'
lightning.src = 'img/molnia2.png'

let player = {
    key: {
        right: 'KeyD',
        left: 'KeyA',
        up: 'KeyW',
        attack: 'KeyE',
        combo: 'KeyZ',
        block: 'KeyQ',
    },
    
    x: 300,
    y: 400,
    height: 220,
    width: 120,
    damage: 0,
    hp: 550,
    speed: 0,
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
    combo: {
        x: 100,
        y: 100,
        height: 120,
        width: 120,
        stop: false,
        active: false,
        damage: 15, //1 урона -13 хп
        imgCombo: {
            img: lightning,
            animation: 0,
            speed: 0,
            animationCombo: {
                0: {
                    imgLightningX: 70,
                    imgLightningY: 10,
                    imgLightningWidth: 72,
                    imgLightningHeight: 122
                },
                1: {
                    imgLightningX: 284,
                    imgLightningY: 10,
                    imgLightningWidth: 72,
                    imgLightningHeight: 199
                },
                2: {
                    imgLightningX: 490,
                    imgLightningY: 10,
                    imgLightningWidth: 77,
                    imgLightningHeight: 227
                },
                3: {
                    imgLightningX: 709,
                    imgLightningY: 10,
                    imgLightningWidth: 122,
                    imgLightningHeight: 264
                },
            },
            imgCharacterLeft: {
                img: stop,
                imgXCharacter: 350,
                imgYCharacter: 110,
            },
            imgCharacterRight: {
                img: run,
                imgXCharacter: 580,
                imgYCharacter: 110,
            },
        },
    },
    block: {
        imgBlockLeft: {
            img: stop,
            imgXBlock: 350,
            imgYBlock: 225,
        },
        imgBlockRight: {
            img: run,
            imgXBlock: 350,
            imgYBlock: 225,
        },
    },
    attack: 20,
    attackEnd: true,
    fall: false,
    looksLefts: true,
}

let player2 = {
    key: {
        right: 'KeyL',
        left: 'KeyJ',
        up: 'KeyI',
        attack: 'KeyO',
        combo: 'KeyN',
        block: 'KeyU',
    },
    x: 1100,
    y: 400,
    height: 220,
    width: 120,
    speed: 0,
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
    combo: {
        x: 100,
        y: 100,
        height: 120,
        width: 120,
        stop: false,
        active: false,
        damage: 15, //1 урона -13 хп
        imgCombo: {
            img: lightning,
            animation: 0,
            speed: 0,
            animationCombo: {
                0: {
                    imgLightningX: 70,
                    imgLightningY: 10,
                    imgLightningWidth: 72,
                    imgLightningHeight: 122
                },
                1: {
                    imgLightningX: 284,
                    imgLightningY: 10,
                    imgLightningWidth: 72,
                    imgLightningHeight: 199
                },
                2: {
                    imgLightningX: 490,
                    imgLightningY: 10,
                    imgLightningWidth: 77,
                    imgLightningHeight: 227
                },
                3: {
                    imgLightningX: 709,
                    imgLightningY: 10,
                    imgLightningWidth: 122,
                    imgLightningHeight: 264
                },
            },
            imgCharacterLeft: {
                img: stop,
                imgXCharacter: 350,
                imgYCharacter: 110,
            },
            imgCharacterRight: {
                img: run,
                imgXCharacter: 580,
                imgYCharacter: 110,
            },
        },
    },
    block: {
        imgBlockLeft: {
            img: stop,
            imgXBlock: 350,
            imgYBlock: 225,
        },
        imgBlockRight: {
            img: run,
            imgXBlock: 350,
            imgYBlock: 225,
        },
    },
    damage: 0,
    attack: 20,
    attackEnd: true,
    hp: 550,
    looksLefts: false,
}

function animationMove(player) {
    var x, y, side;
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
    player.speed++

    if (player.speed % 10 === 0) {
        if (player.speed !== 30) {
            player.imgMoveLeft.imgXMove += 115;
            player.imgMoveRight.imgXMove += 115;
        } else {
            player.imgMoveLeft.imgXMove = player.imgMoveLeft.imgXMoveStat;
            player.imgMoveRight.imgXMove = player.imgMoveRight.imgXMoveStat;
            player.speed = 0;
        }
    }
}

function animationAttack(player) {
    var side;
    if ((set.has(player.key.right) === false) &&
        (set.has(player.key.left) === false) &&
        (set.has(player.key.up) === false) &&
        (set.has(player.key.attack) === true) &&
        !player.fall) {
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
        );
    }
}

function animationCombo(player, player2) {
    if ((set.has(player.key.right) === false) &&
        (set.has(player.key.left) === false) &&
        (set.has(player.key.up) === false) &&
        (set.has(player.key.combo) === true) &&
        !player.fall) {
        player.combo.active = true
    }
    if (!player.combo.active) {
        return;
    }
    if (player.combo.stop) {
        return;
    }
    const comboX = player2.x - 70
    ctx.drawImage(
        player.combo.imgCombo.img,
        player.combo.imgCombo.animationCombo[player.combo.imgCombo.animation].imgLightningX,
        player.combo.imgCombo.animationCombo[player.combo.imgCombo.animation].imgLightningY,
        player.combo.imgCombo.animationCombo[player.combo.imgCombo.animation].imgLightningWidth,
        player.combo.imgCombo.animationCombo[player.combo.imgCombo.animation].imgLightningHeight,
        comboX,
        player.combo.y,
        player.combo.width + width,
        player.combo.height + height
    );//x картинки y картинки ширина и высота картинки

    player.combo.imgCombo.speed++
    if (player.combo.imgCombo.speed % 13 === 0) {
        if (player.combo.imgCombo.speed !== 30) {
            player.combo.imgCombo.animation++
            height += 125
            width += 30
        } else {
            player.combo.imgCombo.speed = 0;

        }
    }

    if (player.combo.imgCombo.animation === 3) {
        player.combo.imgCombo.animation = 0;
        height = 0
        width = 0
        player.combo.active = false
        player.combo.stop = true
        return;
    }
    damageComba(player, player2)
}

function texts() {
    if (timers > 0 && !win1 && !win2) {
        timers--
    }
}

function playerFirst(event, player, player2) {
    if (event.code === player.key.left) {
        set.add(player.key.left)
    }
    if (event.code === player.key.up) {
        set.add(player.key.up)
    }
    if (event.code === player.key.right) {
        set.add(player.key.right)
    }
    if (event.code === player.key.attack) {

        set.add(player.key.attack)
        if (player.attackEnd) {
            damage(player, player2)
        }
    }
    if (event.code === player.key.combo) {
        set.add(player.key.combo)
    }
    if (event.code === player.key.block) {
        set.add(player.key.block)
    }
}


function playerKeyUp(event, player) {
    if (event.code === player.key.left) {
        set.delete(player.key.left)
    }
    if (event.code === player.key.up) {
        set.delete(player.key.up)
        player.fall = true;
    }
    if (event.code === player.key.right) {
        set.delete(player.key.right)
    }
    if (event.code === player.key.attack) {
        set.delete(player.key.attack)
        if (player.looksLefts) {
            if (player.x > 20 && player.x < 1350) {
                player.x = player.x - 50;
            }
        } else {
            if (player.x > 20 && player.x < 1350) {
                player.x = player.x + 50;
            }
        }

        player.attackEnd = true
    }
    if (event.code === player.key.combo) {
        set.delete(player.key.combo)
    }
    if (event.code === player.key.block) {
        set.delete(player.key.block)
    }
}

function damageComba(player, player2) {

    if (player2.y <= player.combo.y + player.combo.height + height && player.combo.y + player.combo.height + height <= player2.y + player2.height) {
        player2.damage += player.combo.damage;
    }
}

function damage(player, player2) {
    let block = 0

    if (set.has(player2.key.block)) {
        block = player.attack
    }
    if (player.looksLefts) {
        if (player.x > 20 && player.x < 1350) {
            player.x = player.x + 50;
        }
        if (player.x >= player2.x - player.width && player.y === 400) {
            player2.damage += player.attack - block;
        }
        player.imgAttackRight.animationAttackRight++;
    } else {
        if (player.x <= player2.x + player.width && player.y === 400) {
            player2.damage += player.attack - block;
        }
        if (player.x > 20 && player.x < 1350) {
            player.x = player.x - 50;
        }
        player.imgAttackLeft.animationAttackLeft++;
    }
    player.attackEnd = false
}

function playerStop(player) {
    var x, y, side;
    if (((set.has(player.key.right)) === false &&
        (set.has(player.key.left) === false) &&
        (set.has(player.key.up) === false) &&
        (set.has(player.key.combo) === false) &&
        (set.has(player.key.block) === false) &&
        (set.has(player.key.attack) === false)) || (set.has(player.key.attack) === true) && player.fall) {
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

function playerInTimeComba(player) {
    var x, y, side;
    if (((set.has(player.key.right) === false) &&
        (set.has(player.key.left) === false) &&
        (set.has(player.key.up) === false) &&
        (set.has(player.key.combo) === true) &&
        (set.has(player.key.attack) === false)) || (set.has(player.key.attack) === true) && player.fall) {
        if (!player.fall) {
            if (player.looksLefts) {
                side = player.combo.imgCombo.imgCharacterLeft.img;
                x = player.combo.imgCombo.imgCharacterLeft.imgXCharacter;
                y = player.combo.imgCombo.imgCharacterLeft.imgYCharacter;
            } else {
                side = player.combo.imgCombo.imgCharacterRight.img;
                x = player.combo.imgCombo.imgCharacterRight.imgXCharacter;
                y = player.combo.imgCombo.imgCharacterRight.imgYCharacter;
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

function playerBlock(player, player2) {
    var x, y, side;
    if (((set.has(player.key.right)) === false &&
        (set.has(player.key.left) === false) &&
        (set.has(player.key.up) === false) &&
        (set.has(player.key.combo) === false) &&
        (set.has(player.key.block) === true) &&
        (set.has(player.key.attack) === false)) || (set.has(player.key.attack) === true) && player.fall) {
        if (!player.fall) {
            if (player.looksLefts) {
                side = player.block.imgBlockLeft.img;
                x = player.block.imgBlockLeft.imgXBlock;
                y = player.block.imgBlockLeft.imgYBlock;
            } else {
                side = player.block.imgBlockRight.img;
                x = player.block.imgBlockRight.imgXBlock;
                y = player.block.imgBlockRight.imgYBlock;
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
        );
    }
}

function playerMove(player, player2) {

    if (set.has(player.key.left) === true) {
        if (player.x > 0 && (player.x >= player2.x + player2.width + 1 || player.x + player.width <= player2.x)) {
            player.x = player.x - 10;
        } else if (player.x > 0 && player.y + player.height < player2.y + (player2.height / 2) + 1) {
            player.x = player.x - 10;
        }
    }

    if (set.has(player.key.up) === true && player.fall === false) {
        if (player.y > 100) {
            player.y = player.y - 15;
        } else {
            player.fall = true
        }


    }
    if (set.has(player.key.right) === true) {
        if (player.x < 1350 && (player.x + player.width + 1 <= player2.x || player.x >= player2.x + player2.width)) {
            player.x = player.x + 10;
        } else if (player.x < 1350 && player.x > 0 && player.y + player.height + 1 < player2.y + (player2.height / 2)) {
            player.x = player.x + 10;
        }
    }
    if ((set.has(player.key.right) === true) || (set.has(player.key.left) === true) || (set.has(player.key.up) === true)) {
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
    if (player.x + player.width / 2 <= player2.x + player2.width / 2
        && player.x + player.width > player2.x
        && player.y + player.height - 120 >= player2.y
        && player.fall
    ) {
        player.x = player.x - 10;
    }
    if (player.x + player.width / 2 > player2.x + player2.width / 2
        && player.x < player2.x + player2.width
        && player.y + player.height - 120 >= player2.y
        && player.fall
    ) {
        player.x = player.x + 10;
    }
}

function playerSide(player, player2) {
    player.looksLefts = player.x + (player.width / 2) < player2.x + (player2.width / 2);
}


function playerFirstHealths(hp, damage) {
    if (damage >= 550) {
        damage = 550;
    }
    ctx.strokeStyle = 'OrangeRed';
    ctx.strokeRect(100, 40, 550, 50)
    ctx.fillStyle = 'LawnGreen'; // меняем цвет клеток
    ctx.fillRect(100 + damage, 40, hp - damage, 50);
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

document.addEventListener("keydown", function () {
    playerFirst(event, player, player2)
});
document.addEventListener("keyup", function () {
    playerKeyUp(event, player)
});
document.addEventListener("keydown", function () {
    playerFirst(event, player2, player)
});
document.addEventListener("keyup", function () {
    playerKeyUp(event, player2)
});

function draw() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = '50px serif';
    ctx.fillStyle = 'black'
    if (timers < 10) {
        center = 740;
    }
    ctx.fillText(timers, center, 80);


    // ctx.drawImage(mol, player.imgX,player.imgY,800,1050,player.x, player.y, player.width, player.height);//x картинки y картинки ширина и высота картинки


    ctx.fillStyle = 'yellow'; // меняем цвет клеток

    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    playerMove(player, player2)
    playerMove(player2, player)
    playerFall(player)
    playerFall(player2)
    playerRolling(player, player2)
    playerRolling(player2, player)
    playerSide(player, player2);
    playerSide(player2, player);
    playerStop(player);
    playerStop(player2);
    playerFirstHealths(player.hp, player.damage);
    playerTwoHealths(player2.hp, player2.damage);
    animationCombo(player, player2)
    animationCombo(player2, player)
    playerInTimeComba(player);
    playerInTimeComba(player2);
    animationAttack(player, player2)
    animationAttack(player2, player)
    playerBlock(player, player2)
    playerBlock(player2, player)
    requestAnimationFrame(draw)
    if (player2.damage >= player2.hp && !win1) {
        alert('игрок 1 выиграл')
        win1 = true
    }
    if (player.damage >= player.hp && !win2) {
        alert('игрок 2 выиграл')
        win2 = true
    }
}


setInterval(texts, 1000)


img.onload = draw;