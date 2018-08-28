// creating a hero element
var hero = new Object();
var hero_fire = new Object();
var enemy1 = new Object();
hero.element = 'hero';
hero.x = 650;
hero.y = 460;
hero.width = 150;
hero.height = 150;
hero_fire.element = 'hero_fire';
hero_fire.x = 645;
hero_fire.y = 430;
hero_fire.width = 20;
hero_fire.height = 20;
enemy1.element = 'enemy1';
enemy1.x = 650;
enemy1.y = 20;
enemy1.width = 150;
enemy1.height = 150;

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
    if (control.up == true)//experiment
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
}
// looping function calls itself in every 2 mili sec
function loop() {
    if (new Date().getTime() - lastUpdate > 40) {
        initials();
        handleControls();
        showChanges();
        collision();
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
function collision() {
    if ((hero_fire.x < (enemy1.x + enemy1.width)) && ((hero_fire.x + hero_fire.width) > enemy1.x) &&
        (hero_fire.y < (enemy1.y + enemy1.height))) {
        console.log("hit");

    }
}

loop();
