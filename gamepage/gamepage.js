
// creating a hero element
var hero = new Object();
var hero_fire = new Object();
var enemy1 = new Object();
var enemy2 = new Object();
var enemy3 = new Object();
var wall =  new Object();
var queen = new Object();
var enemy2_fire = new Object();
var enemy1_fire = new Object();
var enemy3_fire = new Object();
var score = 0;
var dead = [0, 0, 0];
var enemy_targeted = [0, 0, 0];
var count = 0;
var p=0,q=0,r =0;
var enemy_type = ["img/enemy1.png","img/enemy2.png","img/enemy3.gif"];
var enemy1_rotation_angle = - Math.floor(Math.random()*81);
var enemy2_rotation_angle = (-1) * Math.floor(Math.random() * 3) * Math.floor(Math.random() * 60);
var enemy3_rotattion_angle = Math.floor(Math.random()* 81);
var hero_health = 290;
var wall_health =290;
queen.element = "myqueen";
queen.x =600;
queen.y=670;
hero.element = 'hero';
hero.x = 600;
hero.y = 560;
hero.width = 100;
hero.height =150;
hero_fire.element = 'hero_fire';
hero_fire.x= 630;
hero_fire.y=480;
hero_fire.width=10;
hero_fire.height=10;
wall.element = 'wallofqueen';
 wall.x = 500;
 wall.y = 660;
function reset_enemy1_fire() {
  enemy1_fire.element = 'enemy1_fire';
  enemy1_fire.x = enemy1.x + enemy1.width / 2;
  enemy1_fire.y = 250;
  enemy1_fire.width = 20;
  enemy1_fire.height = 20;
}

function reset_enemy2_fire() {
  enemy2_fire.element = 'enemy2_fire';
  enemy2_fire.x = enemy2.x + enemy2.width / 2 - 10;
  enemy2_fire.y = 245;
  enemy2_fire.width = 20;
  enemy2_fire.height = 20;
}

function reset_enemy3_fire() {
  enemy3_fire.element = 'enemy3_fire';
  enemy3_fire.x = enemy3.x + enemy3.width / 2 - 30;
  enemy3_fire.y = 250;
  enemy3_fire.height = 20;
  enemy3_fire.width = 20;
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
  setPosition(queen);
}
// looping function calls itself in every 2 mili sec
function loop() {
  if (new Date().getTime() - lastUpdate > 40) {
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
    // wallhit();
    //herohit();
    lastUpdate = new Date().getTime();
  }
  setTimeout(loop, 2);
}
// checking boundry limits
function bounderylimit(pos){
  if(pos.x < 10)
  {
    pos.x=10;
  }
  if(pos.y < 300)
  {
    pos.y = 300;
  }
  if((pos.x + pos.width ) >= 1100)
  {
    pos.x = 1100 - pos.width;
  }
  if((pos.y + pos.height) >= window.innerHeight - 45)
  {
    pos.y = 555;
  }
}
//animating the fire
function shooting(hero_fire){
  hero_fire.x -= 8 * Math.sin(angle);
  hero_fire.y -= 8 * Math.cos(angle);
  var timer;
  //hero_shoot_sound();
  if(hero_fire.y < -hero_fire.height || hero_fire.x < -hero_fire.width || (hero_fire.y >window.innerHeight + hero_fire.height) || (hero_fire.x + hero_fire.width) >  window.innerWidth )
  {
    clearTimeout('timer');
    document.getElementById("hero_fire").setAttribute("src",".png");

  }
  else{
    timer = setTimeout('shooting(hero_fire)',5);
  }
}
function nextshoot(hero,hero_fire)
{
  hero_fire.x = hero.x + 30;
  hero_fire.y = hero.y - 12 ;
  setPosition(hero_fire);
  document.getElementById('hero_fire').setAttribute("src","img/herofire.png");
}

function enemy1dead() {
  dead[0] = 1;
  document.getElementById("enemy1").setAttribute("src", "img/burned.png");
  count++;
  score +=10;
  document.getElementById("gamescore").innerHTML = score;
  if (count==3)
  {
    setTimeout(nextenemywave,2000);
  }
}

function enemy2dead() {
  dead[1] = 1;
  document.getElementById("enemy2").setAttribute("src", "img/burned.png");
  count++;
  score +=10;
  document.getElementById("gamescore").innerHTML = score;
  if (count == 3)
  {
    setTimeout(nextenemywave, 2500);
  }
}

function enemy3dead() {

  dead[2] =1;
  document.getElementById("enemy3").setAttribute("src", "img/burned.png");
  count++;
  score +=10;
  document.getElementById("gamescore").innerHTML = score;
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
      hit_tank();
      document.getElementById("hero_fire").setAttribute("src", ".png");
      if(enemy_targeted[0] == 4)
      {
        document.getElementById("enemy1").setAttribute("src", "img/blast.png");
        explosion();
        document.getElementById("hero_fire").setAttribute("src", ".png");
        setTimeout(enemy1dead, 500);
      }
    }
  }
}


function collisionenemy2() {
  if(dead[1] == 0)
  {
    if ((hero_fire.x <= (enemy2.x + enemy2.width)) && ((hero_fire.x + hero_fire.width) >= enemy2.x) &&
    (hero_fire.y < (enemy2.y + enemy2.height)) && hero_fire.y > (enemy2.y))
    {
      enemy_targeted[1] += 1;
      hit_tank();
      document.getElementById("hero_fire").setAttribute("src", ".png");

      if(enemy_targeted[1] == 4)
      {
        document.getElementById("enemy2").setAttribute("src", "img/blast.png");
        explosion();

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

        setTimeout(enemy3dead, 500);
      }
    }
  }
}
function nextenemywave()
{   enemyisback();
  p =  Math.floor(Math.random()*3);
  q = Math.floor(Math.random()*3);
  r = Math.floor(Math.random()*3);
  document.getElementById("enemy1").setAttribute("src", enemy_type[p]);
  document.getElementById("enemy2").setAttribute("src", enemy_type[q]);
  document.getElementById("enemy3").setAttribute("src", enemy_type[r]);

}

function enemy1_transition() {
  if ((enemy1.y + enemy1.height) != 300) {
    if(p == 1)
    {
      jet_enemy1_sound_play();
      enemy1.y += 15;
    }
    else if(p==2)
    {
      helicopter_enemy1_sound_play();
      enemy1.y += 10;
    }
    else {
      enemy1.y += 5;
    }
  }
  if ((enemy1.y + enemy1.height) == 300) {
    document.getElementById("enemy1").style.transform = "rotate(-40deg)";
  }
}

function enemy2_transition() {
  if ((enemy2.y + enemy2.height) != 300) {
    if(q == 1)
    {
      jet_enemy2_sound_play();
      enemy2.y += 15;
    }
    else if(q==2)
    {
      helicopter_enemy2_sound_play();
      enemy2.y += 10;
    }
    else {
      enemy2.y += 5;
    }
  }
}

function enemy3_transition() {
  if ((enemy3.y + enemy3.height) != 300) {
    if(r == 1)
    {
      jet_enemy3_sound_play();
      enemy3.y +=15;
    }
    else if(r==2)
    {
      helicopter_enemy3_sound_play();
      enemy3.y += 10;
    }
    else {
      enemy3.y += 5;
    }
  }
  if ((enemy3.y + enemy3.height) == 300) {
    document.getElementById("enemy3").style.transform = "rotate(40deg)";
  }
}

function enemy1_shoot() {
  if (enemy1.y + enemy1.height == 300) {
    if(dead[0] == 1){
      if( p==1){
        jet_enemy1_sound_pause();
      }
      if(p== 2)
      {
        helicopter_enemy1_sound_pause();
      }
      document.getElementById("enemy1_fire").setAttribute("src", ".png");
    }
    else{
      document.getElementById("enemy1_fire").setAttribute("src", "img/fire.png");
    }
    if(p == 2){
      enemy1_fire.x -= 20 * Math.sin(-(40 * Math.PI / 180));
      enemy1_fire.y += 20 * Math.cos(40 * Math.PI / 180);
    }
    else
    {
      enemy1_fire.x -= 10 * Math.sin(-(40 * Math.PI / 180));
      enemy1_fire.y += 10 * Math.cos(40 * Math.PI / 180);
    }
    if (collision_with_boundry(enemy1_fire) || collision_with_hero(enemy1_fire)||collision_with_wall(enemy1_fire))
    {
      setTimeout(reset_enemy1_fire,100);
      // reset_enemy1_fire();
    }

  }
}

function enemy2_shoot() {
  if (enemy2.y + enemy2.height == 300) {
    if(dead[1] == 1){
      if( q==1){
        jet_enemy2_sound_pause();
      }
      if(q== 2)
      {
        helicopter_enemy2_sound_pause();
      }
      document.getElementById("enemy2_fire").setAttribute("src", ".png");
    }
    else{
      document.getElementById("enemy2_fire").setAttribute("src", "img/fire.png");
    }
    if(q == 2)
    {
      enemy2_fire.y += 20;
    }
    else {
      enemy2_fire.y += 5;
    }

  }
  if (collision_with_boundry(enemy2_fire) || collision_with_hero(enemy2_fire)||collision_with_wall(enemy2_fire))
  {

    setTimeout(reset_enemy2_fire,200);
    // reset_enemy2_fire();
  }
}

function enemy3_shoot() {
  if (enemy3.y + enemy3.height == 300) {
    if(dead[2] == 1){
      if( r==1){
        jet_enemy3_sound_pause();
      }
      if(r == 2)
      {
        helicopter_enemy3_sound_pause();
      }
      document.getElementById("enemy3_fire").setAttribute("src", ".png");
    }
    else{
      document.getElementById("enemy3_fire").setAttribute("src", "img/fire.png");
    }
    if(r ==2)
    {
      enemy3_fire.x += 20 * Math.sin(-(40 * Math.PI / 180));
      enemy3_fire.y += 20 * Math.cos(40 * Math.PI / 180);
    }
    else {
      enemy3_fire.x += 10 * Math.sin(-(40 * Math.PI / 180));
      enemy3_fire.y += 10 * Math.cos(40 * Math.PI / 180);
    }

  }
  if (collision_with_boundry(enemy3_fire)||collision_with_hero(enemy3_fire)||collision_with_wall(enemy3_fire))
  {
    reset_enemy3_fire();
  }
}
function collision_with_boundry(collision){
  if(collision.y + collision.height > window.innerHeight)
  return true;
  else
  return false;
}
function collision_with_hero(collision)
{
  if ((collision.y+collision.height) >= hero.y && (collision.y + collision.height) <= (hero.y + hero.height) && collision.x >= hero.x && collision.x <= (hero.x + hero.width))
  {
    hero_hit_sound();
    hero_health -= 2;
    document.getElementById("hero_health").style.width = hero_health +"px";
      if(hero_health == 0)
      {
        explosion();
        document.getElementById("hero").setAttribute("src", "img/blast.png");
      game_over();
      }
    return true;
  }
  else
  return false;
}
function collision_with_wall(collision)
{

  if(collision.y + collision.height >= wall.y)
  {
    wall_health -=1;
  document.getElementById("wall_health").style.width = wall_health +"px";
  if(wall_health == 0)
  {

    game_over();
  }
  return true;
}
  else
  return false;
}
function game_over(){
document.getElementById("gameover").click();
}
function hit_tank(){
  document.getElementById('hit_enemy').play();
}
function explosion(){
  document.getElementById('explode').play();
}
function jet_enemy1_sound_play(){
  document.getElementById('jet_enemy1_sound').play();
}
function helicopter_enemy1_sound_play(){
  document.getElementById('helicopter_enemy1_sound').play();
}
function jet_enemy2_sound_play(){
  document.getElementById('jet_enemy2_sound').play();
}
function helicopter_enemy2_sound_play(){
  document.getElementById('helicopter_enemy2_sound').play();
}
function jet_enemy3_sound_play(){
  document.getElementById('jet_enemy3_sound').play();
}
function helicopter_enemy3_sound_play(){
  document.getElementById('helicopter_enemy3_sound').play();
}
function jet_enemy1_sound_pause(){
  document.getElementById('jet_enemy1_sound').pause();
}
function helicopter_enemy1_sound_pause(){
  document.getElementById('helicopter_enemy1_sound').pause();
}
function jet_enemy2_sound_pause(){
  document.getElementById('jet_enemy2_sound').pause();
}
function helicopter_enemy2_sound_pause(){
  document.getElementById('helicopter_enemy2_sound').pause();
}
function jet_enemy3_sound_pause(){
  document.getElementById('jet_enemy3_sound').pause();
}
function helicopter_enemy3_sound_pause(){
  document.getElementById('helicopter_enemy3_sound').pause();
}
function hero_hit_sound()
{
  document.getElementById("hero_hit").volume = 0.5;
  document.getElementById("hero_hit").play();
}
// function hero_shoot_sound(){
//   document.getElementById("hero_shoot").volume = 0.5;
//   document.getElementById("hero_shoot").play();
// }
//initials();
document.getElementById("gamescore").innerHTML = score;
reset_enemy3_fire();
reset_enemy1_fire();
reset_enemy2_fire();
loop();
