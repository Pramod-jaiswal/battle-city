
// creating a hero element
var hero = new Object();
var hero_fire = new Object();
var enemy1 = new Object();
var enemy2 = new Object();
var enemy3 = new Object();
var wall =  new Object();
var enemy2_fire = new Object();
var enemy1_fire = new Object();
var enemy3_fire = new Object();
var score = 0;
var dead = [0, 0, 0];
var enemy_targeted = [0, 0, 0];
var count = 0;
document.getElementById("gamescore").innerHTML = score;
hero.element = 'hero';
hero.x = 600;
hero.y = 400;
hero.width = 150;
hero.height =150;
hero_fire.element = 'hero_fire';
hero_fire.x= 700;
hero_fire.y=438;
hero_fire.width=10;
hero_fire.height=10;
wall.element = 'wallofqueen';
wall.x = 500;
wall.y = 550;
function reset_enemy1_fire() {
  enemy1_fire.element = 'enemy1_fire';
  enemy1_fire.x = enemy1.x + enemy1.width / 2 + 45;
  enemy1_fire.y = 270;
  enemy1_fire.width = 20;
  enemy1_fire.height = 20;
}

function reset_enemy2_fire() {
  enemy2_fire.element = 'enemy2_fire';
  enemy2_fire.x = enemy2.x + enemy2.width / 2 - 10;
  enemy2_fire.y = 290;
  enemy2_fire.width = 10;
  enemy2_fire.height = 10;
}

function reset_enemy3_fire() {
  enemy3_fire.element = 'enemy3_fire';
  enemy3_fire.x = enemy3.x + enemy3.width / 2 - 55;
  enemy3_fire.y = 260;
  enemy3_fire.height = 10;
  enemy3_fire.width = 10;
}


var enemyisback = (function again()
{  count = 0; 
   document.getElementById("enemy1").style.transform = "rotate(0deg)";
    document.getElementById("enemy3").style.transform = "rotate(0deg)";
   dead = [0, 0, 0];
   enemy_targeted = [0, 0, 0];
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
  return again;
})();
function initials(){
  hero.margin_left=60;
  hero.margin_right =100;
  hero.margin_top =30;
  hero.margin_bottom =0;
}
function setPosition(obj){
  var e = document.getElementById(obj.element);
  e.style.left = obj.x + 'px';
  e.style.top = obj.y + 'px';
}
//moving the hero element
var LEFTKEY = 37;
var  UPKEY =38;
var  RIGHTKEY=39;
var DOWNKEY = 40;
var LEFTROTATE = 188;
var RIGHTROTATE = 190;
var SHOOT = 32;
var lastUpdate  = 0;
var angle=0;
// on pressing key the keycode and a boolean value is returned
document.onkeydown = function(evt) {
  keypressed(evt.keyCode,true);
};
document.onkeyup  = function(evt){
  keypressed(evt.keyCode,false);
};
// event on pressing keys
var control = new Object();
// event on key press
function keypressed(keyCode,value){ //experiment
  if(keyCode == LEFTKEY){
    control.left = value;
    sound();
  }
  if(keyCode == RIGHTKEY){
    control.right = value;
    sound();
  }
  if(keyCode == UPKEY){
    control.up = value;
    sound();
  }
  if(keyCode == DOWNKEY){
    control.down = value;
    sound();
  }
  if(keyCode == RIGHTROTATE){
    control.rotateright = value;
    sound();
  }
  if(keyCode == LEFTROTATE){
    control.rotateleft = value;
    sound();
  }
  if(keyCode == SHOOT){
    control.shoot = value;
  }
}
// handles the controls
function handleControls(){
  if(control.up == true)//experiment
  {
    hero.y -= 4;
  }
  if(control.down == true)
  {
    hero.y += 4;
  }
  if(control.left == true)
  {
    hero.x -= 6;
  }
  if(control.right == true)
  {
    hero.x += 6;
  }
  if(control.rotateleft == true){
    document.getElementById('hero').style.transform +="rotate(-5deg)";
    document.getElementById('hero_fire').style.transform +="rotate(-5deg)";
    angle += (5*Math.PI)/180;
  }
  if(control.rotateright == true){
    document.getElementById('hero').style.transform +="rotate(5deg)";
    document.getElementById('hero_fire').style.transform +="rotate(5deg)";
    angle += (-5*Math.PI)/180;
  }
  if(control.shoot == true)
  {

    shooting(hero_fire);
    nextshoot(hero,hero_fire);
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
    setPosition(enemy1_fire);
    setPosition(enemy2_fire);
    setPosition(enemy3_fire);
    
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
        enemy1_transition();
        enemy3_transition();
        enemy2_transition();
        enemy1_shoot();
        enemy2_shoot();
        enemy3_shoot();
       // herohit();
        // wallhit();
        
        lastUpdate = new Date().getTime();
    }
    setTimeout(loop, 2);
}
// checking boundry limits
function bounderylimit(pos){
  if(pos.x <pos.margin_left)
  {
    pos.x=pos.margin_left;
  }
  if(pos.y < pos.margin_top)
  {
    pos.y = pos.margin_top;
  }
  if((pos.x + pos.width+pos.margin_right ) > window.innerWidth)
  {
    pos.x = window.innerWidth - (pos.margin_right + pos.width );
  }
  if((pos.y + pos.height + pos.margin_bottom) > window.innerHeight)
  {
    pos.y= window.innerHeight - (pos.margin_bottom+pos.height);
  }

}
//animating the fire
function shooting(hero_fire){
  hero_fire.x -= 5 * Math.sin(angle);
  hero_fire.y -= 5 * Math.cos(angle);
  var timer;
  if(hero_fire.y < -hero_fire.height || hero_fire.x < -hero_fire.width || (hero_fire.y >window.innerHeight + hero_fire.height) || (hero_fire.x + hero_fire.width) >  window.innerWidth )
  {
    clearTimeout('timer');
    document.getElementById("hero_fire").setAttribute("src"," ");

  }
  else{
    timer = setTimeout('shooting(hero_fire)',5);
  }
}
function nextshoot(hero,hero_fire)
{
  hero_fire.x = hero.x + 50;
  hero_fire.y = hero.y - 12 ;
  setPosition(hero_fire);
  document.getElementById('hero_fire').setAttribute("src","img/fire.png");
}

function enemy1dead() {
  dead[0] =1;

    document.getElementById("enemy1").setAttribute("src", "img/burned.png");
    count++;
     if (count==3)
        {
          setTimeout(nextenemywave,2000);
        }
}

function enemy2dead() {
  dead[1] = 1;
    document.getElementById("enemy2").setAttribute("src", "img/burned.png");
    count++;
     if (count == 3)
     {
         setTimeout(nextenemywave, 2000);
     }
}

function enemy3dead() {

  dead[2] =1;
    document.getElementById("enemy3").setAttribute("src", "img/burned.png");
    count++;
     if (count == 3)
     {
         setTimeout(nextenemywave, 2000);
     }
}

function collisionenemy1() {
  if(dead[0] == 0)
  {
    if ((hero_fire.x <= (enemy1.x + enemy1.width)) && ((hero_fire.x + hero_fire.width) >= enemy1.x) &&
        (hero_fire.y < (enemy1.y + enemy1.height)) && hero_fire.y >  (enemy1.y))
     {
       enemy_targeted[0] += 1;

       // change the target color to indicate hit
       // call hit sound here
      document.getElementById("hero_fire").setAttribute("src", ".png");
      
       hit_tank();
      if (enemy_targeted[0] == 4)
      {
        document.getElementById("enemy1").setAttribute("src", "img/blast.png");
        explosion();
        document.getElementById("hero_fire").setAttribute("src", ".png");
        score +=10;
        document.getElementById("gamescore").innerHTML = score;
        setTimeout(enemy1dead, 500);
}
    }}
  }


function collisionenemy2() {
  if(dead[1] == 0)
  {
    if ((hero_fire.x <= (enemy2.x + enemy2.width)) && ((hero_fire.x + hero_fire.width) >= enemy2.x) &&
        (hero_fire.y < (enemy2.y + enemy2.height)) && hero_fire.y > (enemy2.y))
      {
         enemy_targeted[1] += 1;
    
      document.getElementById("hero_fire").setAttribute("src", ".png");
         hit_tank();
         if(enemy_targeted[1] == 4)
         {
        document.getElementById("enemy2").setAttribute("src", "img/blast.png");
            explosion();
           score += 10;
           document.getElementById("gamescore").innerHTML = score;
        document.getElementById("hero_fire").setAttribute("src", ".png");
           
           setTimeout(enemy2dead, 500);
      }
    }
  }
}
function collisionenemy3() {
  if(dead[2] == 0)
  {
    if ((hero_fire.x <= (enemy3.x + enemy3.width)) && ((hero_fire.x + hero_fire.width) >= enemy3.x) &&
        (hero_fire.y < (enemy3.y + enemy3.height)) && hero_fire.y > (enemy3.y))
    {
      enemy_targeted[2] += 1;
      
      document.getElementById("hero_fire").setAttribute("src", ".png");
      hit_tank();
       if(enemy_targeted[2] == 4)
       {
    document.getElementById("enemy3").setAttribute("src", "img/blast.png");
        explosion();
        document.getElementById("hero_fire").setAttribute("src", ".png");
         score += 10;
         document.getElementById("gamescore").innerHTML = score;
         setTimeout(enemy3dead, 500);
      }
    }
  }
}
function nextenemywave()
{   enemyisback();
    document.getElementById("enemy1").setAttribute("src", "img/enemy1.png");
    document.getElementById("enemy2").setAttribute("src", "img/enemy1.png");
    document.getElementById("enemy3").setAttribute("src", "img/enemy1.png");
    
}

function enemy1_transition() {
  if ((enemy1.y + enemy1.height) != 300) {
    enemy1.y += 5;

  }
  if ((enemy1.y + enemy1.height) == 300) {
    document.getElementById("enemy1").style.transform = "rotate(-45deg)";
  }
}

function enemy2_transition() {
  if ((enemy2.y + enemy2.height) != 300) {
    enemy2.y += 5;
  }
}

function enemy3_transition() {
  if ((enemy3.y + enemy3.height) != 300) {
    enemy3.y += 5;
  }
  if ((enemy3.y + enemy3.height) == 300) {
    document.getElementById("enemy3").style.transform = "rotate(45deg)";
  }
}

function enemy1_shoot() {
  if (enemy1.y + enemy1.height == 300) {
    document.getElementById("enemy1_fire").setAttribute("src", "img/fire.png");
    enemy1_fire.x -= 10 * Math.sin(-(45 * Math.PI / 180));
    enemy1_fire.y += 10 * Math.cos(45 * Math.PI / 180);
    if (enemy1_fire.y + enemy1_fire.height > window.innerHeight) {
      reset_enemy1_fire();
    }
  }
}

function enemy2_shoot() {
  if (enemy2.y + enemy2.height == 300) {
    document.getElementById("enemy2_fire").setAttribute("src", "img/fire.png");
    enemy2_fire.y += 10;
  }
  if (enemy2_fire.y + enemy2_fire.height > window.innerHeight) {
    reset_enemy2_fire();
  }
}

function enemy3_shoot() {
  if (enemy3.y + enemy3.height == 300) {
    document.getElementById("enemy3_fire").setAttribute("src", "img/fire.png");
    enemy3_fire.x += 10 * Math.sin(-(45 * Math.PI / 180));
    enemy3_fire.y += 10 * Math.cos(45 * Math.PI / 180);
  }
  if (enemy3_fire.y + enemy3_fire.height > window.innerHeight) {
    reset_enemy3_fire();
  }
}

// function herohit()
// {
//   if ((enemy2_fire.x >= (hero.x + hero.width)) && ((enemy2_fire.x + enemy2_fire.width) <= hero.x) &&
//     (enemy2_fire.y > (hero.y + hero.height)) && enemy2_fire.y < (hero.y))
//      {
//          console.log(herohitbyenemy2);
//       document.getElementById("enemy2_fire").setAttribute("src", ".png"); 
//      }
// }

// function wallhit()
// {
//   if(enemy2_fire.y >= (wall.y + wall.height) && 
//   (enemy2_fire.x +enemy2_fire.width) >= wall.x && enemy2_fire.x <= (wall.x + wall.width))
//   {
//     console.log(wallhitbyenemy2);
//   }
// }
// function sound(){
//   document.getElementById('sound1').play();
// }
function hit_tank(){
   document.getElementById('hit_enemy').play();
}
function explosion(){
   document.getElementById('explode').play();
}
//initials();
reset_enemy3_fire();
reset_enemy1_fire();
reset_enemy2_fire();
loop();
