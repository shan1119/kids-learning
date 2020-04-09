var t = 0;

function setTimer() {
    t++;
    var m = Math.floor(t / 60);
    var s = t - 60 * m;
    timer.innerText = m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
}