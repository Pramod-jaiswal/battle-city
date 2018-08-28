// creating a hero element
var hero = new Object();
var hero_fire = new Object();
var enemy1 = new Object();
var enemy2 = new Object();
var enemy3 = new Object();
var count = 0;
var score = 0;
hero.element = 'hero';
hero.x = 400;
hero.y = 600;
hero.width = 150;
hero.height = 150;
hero_fire.element = 'hero_fire';
hero_fire.x = 411;
hero_fire.y = 550;
hero_fire.width = 20;
hero_fire.height = 20;
enemy1.element = 'enemy1';
enemy1.x = 400;
enemy1.y = 20;
enemy1.width = 150;
enemy1.height = 150;
enemy2.element = 'enemy2';
enemy2.x = 200;
enemy2.y = 20;
enemy2.width = 150;
enemy2.height = 150;
enemy3.element = 'enemy3';
enemy3.x = 600;
enemy3.y = 20;
enemy3.width = 150;
enemy3.height = 150;

function initials() {
    hero.margin_left = 0;
    hero.margin_right = 0;
    hero.margin_top = 30;
    hero.margin_bottom = 0;
    hero_fire.margin_left = 40;
    hero_fire.margin_right = 60;
    hero_fire.margin_top = 0;
    hero_fire.margin_bottom = 130;
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
    if (control.up == true) //experiment
    {
        hero.y -= 4;
        hero_fire.y -= 4;
    }
    if (control.down == true) {
        hero.y += 4;
        hero_fire.y += 4;
    }
    if (control.left == true) {
        hero.x -= 6;
        hero_fire.x -= 6;
    }
    if (control.right == true) {
        hero.x += 6;
        hero_fire.x += 6;
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
        if (hero.x < window.innerWidth - hero.width && hero.x > hero_fire.width) {
            hero_fire.margin_left = 0;
            hero_fire.margin_right = 0;
        }
        if (hero.y > window.innerHeight - hero.height && hero.y < hero.innerHeight) {
            hero_fire.margin_top = 100;
            hero_fire.margin_bottom = 0;
        }
        bounderylimit(hero_fire);
        shooting(hero_fire);

    }

    console.log(angle);
    bounderylimit(hero);
    bounderylimit(hero_fire);
}
// changes are reflected
function showChanges() {
    setPosition(hero);
    setPosition(hero_fire);
    setPosition(enemy1);
    setPosition(enemy2);
    setPosition(enemy3);
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
// function sound(){
//   document.getElementById('sound1').play();
// }
// animating the fire
function shooting(pos) {
    pos.y -= 5;
    setTimeout('shooting(hero_fire)', 20);
}

function enemy1dead() {
    document.getElementById("enemy1").setAttribute("src", " ");
    // if (count==3)
    //    {
    //      setTimeout(nextenemywave,1000);
    //    }
}

function enemy2dead() {
    document.getElementById("enemy2").setAttribute("src", " ");
    // if (count == 3)
    // {
    //     setTimeout(nextenemywave, 1000);
    // }
}

function enemy3dead() {
    document.getElementById("enemy3").setAttribute("src", " ");
    // if (count == 3) 
    // {
    //     setTimeout(nextenemywave, 1000);
    // }
}

function collisionenemy1() {
    if ((hero_fire.x < (enemy1.x + enemy1.width)) && ((hero_fire.x + hero_fire.width) > enemy1.x) &&
        (hero_fire.y < (enemy1.y + enemy1.height))) {
        console.log("enemy1 hit");
        count++;
        document.getElementById("enemy1").setAttribute("src", "blast.png");
        setTimeout(enemy1dead, 1000);
    }
}

function collisionenemy2() {
    if ((hero_fire.x < (enemy2.x + enemy2.width)) && ((hero_fire.x + hero_fire.width) > enemy2.x) &&
        (hero_fire.y < (enemy2.y + enemy2.height))) {
        console.log("enemy hit 2");
        count++;
        document.getElementById("enemy2").setAttribute("src", "blast.png");
        setTimeout(enemy2dead, 1000);
    }
}

function collisionenemy3() {
    if ((hero_fire.x < (enemy3.x + enemy3.width)) && ((hero_fire.x + hero_fire.width) > enemy3.x) &&
        (hero_fire.y < (enemy3.y + enemy3.height))) {
        console.log("enemy3 hit");
        count++;
        document.getElementById("enemy3").setAttribute("src", "blast.png");
        setTimeout(enemy3dead, 1000);
    }
}
// function nextenemywave()
// {
//     document.getElementById("enemy1").setAttribute("src", "enemy2.png");
//     document.getElementById("enemy2").setAttribute("src", "enemy2.png");
//     document.getElementById("enemy3").setAttribute("src", "enemy3.png");
// }
loop();
