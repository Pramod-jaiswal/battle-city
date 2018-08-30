
// creating a hero element
var hero = new Object();
var hero_fire = new Object();
var enemy1 = new Object();
var enemy2 = new Object();
var enemy3 = new Object();
var wall = new Object();
var dead = [0, 0, 0];
var enemy_targeted = [0, 0, 0];
var score = 0;
document.getElementById("gamescore").innerHTML = score;
hero.element = 'hero';
hero.x = 650;
hero.y = 250;
hero.width = 150;
hero.height = 150;
hero_fire.element = 'hero_fire';
hero_fire.x = 700;
hero_fire.y = 438;
hero_fire.width = 10;
hero_fire.height = 10;
wall.element = 'wallofqueen';
wall.x = 500;
wall.y = 70;
enemy1.element = 'enemy1';
enemy1.x = 200;
enemy1.y = 0;
enemy1.width = 80;
enemy1.height = 150;
enemy2.element = 'enemy2';
enemy2.x = 600;
enemy2.y = 0;
enemy2.width = 80;
enemy2.height = 150;
enemy3.element = 'enemy3';
enemy3.x = 1000;
enemy3.y = 0;
enemy3.width = 80;
enemy3.height = 150;
function initials() {
    hero.margin_left = 60;
    hero.margin_right = 100;
    hero.margin_top = 30;
    hero.margin_bottom = 0;
}
function setPosition(obj) {
    var e = document.getElementById(obj.element);
    e.style.left = obj.x + 'px';
    e.style.top = obj.y + 'px';
}
//moving the hero element
var LEFTKEY = 37;
var UPKEY = 38;
var RIGHTKEY = 39;
var DOWNKEY = 40;
var LEFTROTATE = 188;
var RIGHTROTATE = 190;
var SHOOT = 32;
var lastUpdate = 0;
var angle = 0;
// on pressing key the keycode and a boolean value is returned
document.onkeydown = function (evt) {
    keypressed(evt.keyCode, true);
};
document.onkeyup = function (evt) {
    keypressed(evt.keyCode, false);
};
// event on pressing keys
var control = new Object();
// event on key press
function keypressed(keyCode, value) { //experiment
    if (keyCode == LEFTKEY) {
        control.left = value;
        sound();
    }
    if (keyCode == RIGHTKEY) {
        control.right = value;
        sound();
    }
    if (keyCode == UPKEY) {
        control.up = value;
        sound();
    }
    if (keyCode == DOWNKEY) {
        control.down = value;
        sound();
    }
    if (keyCode == RIGHTROTATE) {
        control.rotateright = value;
        sound();
    }
    if (keyCode == LEFTROTATE) {
        control.rotateleft = value;
        sound();
    }
    if (keyCode == SHOOT) {
        control.shoot = value;
    }
}
// handles the controls
function handleControls() {
    if (control.up == true)//experiment
    {
        hero.y -= 4;
    }
    if (control.down == true) {
        hero.y += 4;
    }
    if (control.left == true) {
        hero.x -= 6;
    }
    if (control.right == true) {
        hero.x += 6;
    }
    if (control.rotateleft == true) {
        document.getElementById('hero').style.transform += "rotate(-5deg)";
        document.getElementById('hero_fire').style.transform += "rotate(-5deg)";
        angle += (5 * Math.PI) / 180;
    }
    if (control.rotateright == true) {
        document.getElementById('hero').style.transform += "rotate(5deg)";
        document.getElementById('hero_fire').style.transform += "rotate(5deg)";
        angle += (-5 * Math.PI) / 180;
    }
    if (control.shoot == true) {

        shooting(hero_fire);
        nextshoot(hero, hero_fire);
    }

    console.log(angle);
    bounderylimit(hero);
    //bounderylimit(hero_fire);
}
// changes are reflected
function showChanges() {
    setPosition(hero);
    setPosition(hero_fire);
    setPosition(enemy1);
    setPosition(enemy2);
    setPosition(enemy3);
    setPosition(wall);
}
// looping function calls itself in every 2 mili sec
function loop() {
    if (new Date().getTime() - lastUpdate > 40) {
        initials();
        handleControls();
        showChanges();
        collisionenemy1();
        collisionenemy2();
        collisionenemy3();
        lastUpdate = new Date().getTime();
    }
    setTimeout('loop();', 2);
}
// checking boundry limits
function bounderylimit(pos) {
    if (pos.x < pos.margin_left) {
        pos.x = pos.margin_left;
    }
    if (pos.y < pos.margin_top) {
        pos.y = pos.margin_top;
    }
    if ((pos.x + pos.width + pos.margin_right) > window.innerWidth) {
        pos.x = window.innerWidth - (pos.margin_right + pos.width);
    }
    if ((pos.y + pos.height + pos.margin_bottom) > window.innerHeight) {
        pos.y = window.innerHeight - (pos.margin_bottom + pos.height);
    }

}
//animating the fire
function shooting(hero_fire) {
    hero_fire.x -= 5 * Math.sin(angle);
    hero_fire.y -= 5 * Math.cos(angle);
    var timer;
    if (hero_fire.y < -hero_fire.height || hero_fire.x < -hero_fire.width || (hero_fire.y > window.innerHeight + hero_fire.height) || (hero_fire.x + hero_fire.width) > window.innerWidth) {
        clearTimeout('timer');
        document.getElementById("hero_fire").setAttribute("src", " ");

    }
    else {
        timer = setTimeout('shooting(hero_fire)', 5);
    }
}
function nextshoot(hero, hero_fire) {
    hero_fire.x = hero.x + 50;
    hero_fire.y = hero.y - 12;
    setPosition(hero_fire);
    document.getElementById('hero_fire').setAttribute("src", "img/fire.png");
}
function enemy1dead() {
    dead[0] = 1;

    document.getElementById("enemy1").setAttribute("src", "img/burned.png");
    // call blast sound here
    // if (count==3)
    //    {
    //      setTimeout(nextenemywave,1000);
    //    }
}

function enemy2dead() {
    dead[1] = 1;
    document.getElementById("enemy2").setAttribute("src", "img/burned.png");
    // if (count == 3)
    // {
    //     setTimeout(nextenemywave, 1000);
    // }
}

function enemy3dead() {

    dead[2] = 1;
    document.getElementById("enemy3").setAttribute("src", "img/burned.png");
    // if (count == 3)
    // {
    //     setTimeout(nextenemywave, 1000);
    // }
}

function collisionenemy1() {
    if (dead[0] == 0) {
        if ((hero_fire.x <= (enemy1.x + enemy1.width)) && ((hero_fire.x + hero_fire.width) >= enemy1.x) &&
            (hero_fire.y < (enemy1.y + enemy1.height)) && hero_fire.y > (7 * enemy1.y)) {
            enemy_targeted[0] += 1;
            // change the target color to indicate hit
            // call hit sound here
            score += 10;
            document.getElementById("gamescore").innerHTML = score;
            hit_tank();
            if (enemy_targeted[0] == 4) {
                document.getElementById("enemy1").setAttribute("src", "img/blast.png");
                explosion();
                document.getElementById("hero_fire").setAttribute("src", ".png");
                setTimeout(enemy1dead, 500);
            }
        }
    }
}

function collisionenemy2() {
    if (dead[1] == 0) {
        if ((hero_fire.x <= (enemy2.x + enemy2.width)) && ((hero_fire.x + hero_fire.width) >= enemy2.x) &&
            (hero_fire.y < (enemy2.y + enemy2.height)) && hero_fire.y > (7 * enemy2.y)) {
            enemy_targeted[1] += 1;
            score += 10;
            document.getElementById("gamescore").innerHTML = score;
            hit_tank();
            if (enemy_targeted[1] == 4) {
                document.getElementById("enemy2").setAttribute("src", "img/blast.png");
                explosion();
                document.getElementById("hero_fire").setAttribute("src", ".png");
                setTimeout(enemy2dead, 500);
            }
        }
    }
}
function collisionenemy3() {
    if (dead[2] == 0) {
        if ((hero_fire.x <= (enemy3.x + enemy3.width)) && ((hero_fire.x + hero_fire.width) >= enemy3.x) &&
            (hero_fire.y < (enemy3.y + enemy3.height)) && hero_fire.y > (7 * enemy3.y)) {
            enemy_targeted[2] += 1;
            score += 10;
            document.getElementById("gamescore").innerHTML = score;
            hit_tank();
            if (enemy_targeted[2] == 4) {
                document.getElementById("enemy3").setAttribute("src", "img/blast.png");
                explosion();
                document.getElementById("hero_fire").setAttribute("src", ".png");
                setTimeout(enemy3dead, 500);
            }
        }
    }
}
// function nextenemywave()
// {
//     document.getElementById("enemy1").setAttribute("src", "enemy1.png");
//     document.getElementById("enemy2").setAttribute("src", "enemy2.png");
//     document.getElementById("enemy3").setAttribute("src", "enemy3.png");
// }
// function sound(){
//   document.getElementById('sound1').play();
// }
function hit_tank() {
    document.getElementById('hit_enemy').play();
}
function explosion() {
    document.getElementById('explode').play();
}
//initials();
loop();
