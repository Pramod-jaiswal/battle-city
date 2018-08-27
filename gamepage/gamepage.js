
// creating a hero element
var hero = new Object();
hero.element = 'hero';
hero.x = 650;
hero.y = 460;
hero.width = 150;
hero.height =150;
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
var lastUpdate  = 0;
document.onkeydown = function(evt) {
  keypressed(evt.keyCode,true);
};
document.onkeyup  = function(evt){
  keypressed(evt.keyCode,false);
};

// event on pressing keys
var control = new Object();
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
}
function handleControls(){
  if(control.up == true)//experiment
  {hero.y -= 4;}
  if(control.down == true)
  {hero.y += 4;}
  if(control.left == true)
  {hero.x -= 6;}
  if(control.right == true)
  {hero.x += 6;}
  if(control.rotateleft == true){
    document.getElementById('hero').style.transform +="rotate(-5deg)";
  }
  if(control.rotateright == true){
      document.getElementById('hero').style.transform +="rotate(5deg)";
  }
  bounderylimit(hero);
}
function  showChanges(){
  setPosition(hero);
}
function loop(){
  if(new Date().getTime() - lastUpdate> 40){
    handleControls();
    showChanges();
    lastUpdate = new Date().getTime();
  }
  setTimeout('loop();',2);
}
function bounderylimit(pos){
if(pos.x <5)
{pos.x=5;}
if(pos.y < 5){
  pos.y = 5;
}
if((pos.x + pos.width) > window.innerWidth){
  pos.x = window.innerWidth - pos.height;
}
if((pos.y + pos.height ) > window.innerHeight){
  pos.y= window.innerHeight - pos.width;
}
}
 function sound(){
  document.getElementById('sound1').play();
  //   setTimeOut(sound,1);
 // document.getElementById('sound1').pause();
}
loop();
