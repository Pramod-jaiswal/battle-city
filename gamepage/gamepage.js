
// creating a hero element
var hero = new Object();
var hero_fire = new Object();
hero.element = 'hero';
hero.x = 650;
hero.y = 460;
hero.width = 150;
hero.height =150;
hero_fire.element = 'hero_fire';
hero_fire.x=638;
hero_fire.y=438;
hero_fire.width=50;
hero_fire.height=50;
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
function  showChanges(){
  setPosition(hero);
  setPosition(hero_fire);
}
// looping function calls itself in every 2 mili sec
function loop(){
  if(new Date().getTime() - lastUpdate> 40){
    handleControls();
    showChanges();
    lastUpdate = new Date().getTime();
  }
  setTimeout('loop();',2);

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
// function sound(){
//   document.getElementById('sound1').play();
// }
// animating the fire
function shooting(hero_fire){

  hero_fire.x -= 5 * Math.sin(angle);
  hero_fire.y -= 5 * Math.cos(angle);



  var timer;
  if(hero_fire.y < 0 || hero_fire.x < 0 || hero_fire.y >window.innerHeight || hero_fire.x >  window.innerWidth)
  {
    clearTimeout('timer');
    document.getElementById("hero_fire").setAttribute("src"," ");

  }
  else{
    timer = setTimeout('shooting(hero_fire)',5);
  }
}
function nextshoot(hero,hero_fire){
  hero_fire.x= hero.x - 5 ;
  hero_fire.y = hero.y - 5;
  setPosition(hero_fire);
  document.getElementById('hero_fire').setAttribute("src","fire.png");
}
initials();
loop();
