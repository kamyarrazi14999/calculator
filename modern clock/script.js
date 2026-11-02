const second = document.querySelector('.second');
function updateClock() { 
    const now = new Date();
    const seconds = now.getSeconds();
    now.getMilliseconds() / 1000;
    second.style.transform = `rotate(${seconds * 6}deg)`;
    requestAnimationFrame(updateClock);
  
}
updateClock();