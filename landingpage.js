
window.addEventListener("keydown", function(press) {
    if (press.keyCode === 13) {
        document.getElementById('continue').click();
    }
});
document.getElementById('themesound').play();
