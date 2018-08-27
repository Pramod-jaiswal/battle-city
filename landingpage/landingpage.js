
window.addEventListener("keydown", function(press) {
  console.log("hello");
    if (press.keyCode === 13) {
        document.getElementById('continue').click();
    }
});
document.getElementById('themesound').play();
