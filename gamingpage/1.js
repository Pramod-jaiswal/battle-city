var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var run;
 
var background = new Image();
background.src = "http://texturelib.com/Textures/grass/grass/grass_grass_0076_01_preview.jpg";

//background.onload = function () {
  //  ctx.drawImage(background, 0, 0, 100, 100);
//}

//ctx.save();
//ctx.translate(30, 0);
//ctx.rotate(0.8);

make_tank();
function make_tank() {
    base_image = new Image();
    base_image.src = 'https://static.thenounproject.com/png/1325281-200.png';
    base_image.onload = function () {
        ctx.drawImage(base_image, 0, 10, 30, 30);
        //ctx.style.transform= rotate(20deg)
        
    }
}
//ctx.restore();

//ctx.save();
//ctx.translate(60, 0);
//ctx.rotate(0);

make_tank2();
function make_tank2() {
    base_image2 = new Image();
    base_image2.src = 'https://static.thenounproject.com/png/1325281-200.png';
    base_image2.onload = function () {
        ctx.drawImage(base_image2, 0, 50, 30, 30);

    }
}
//ctx.restore();

//ctx.save();

//ctx.translate(90, 0);
//ctx.rotate(1.8);

make_tank3();
function make_tank3() {
    base_image3 = new Image();
    base_image3.src = 'https://static.thenounproject.com/png/1325281-200.png';
    base_image3.onload = function () {
        ctx.drawImage(base_image3, 0, 90, 30, 30);

    }
}
//ctx.restore();
