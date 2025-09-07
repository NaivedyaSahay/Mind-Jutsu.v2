
let gameseq = [];
let userseq = [];
let colorbutton = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;

const h3 = document.querySelector("h3");
const startBtn = document.getElementById("start-btn");

// Start game on keypress
document.addEventListener("keypress", startGame);
// Start game on button tap/click
startBtn.addEventListener("click", startGame);

function startGame() {
  if (!started) {
    started = true;
    startBtn.style.display = "none";     // hide the button
    levelUp();
  }
}

function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function levelUp() {
  userseq = [];
  level++;
  h3.innerText = `Level ${level}`;
  let randomidx = Math.floor(Math.random() * 4); // use 4 not 3
  let randomcolor = colorbutton[randomidx];
  let randombutton = document.getElementById(randomcolor);
  gameseq.push(randomcolor);
  btnflash(randombutton);
}

function checkans(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key or tap to restart`;
    document.body.style.backgroundImage = "red";
    setTimeout(() => document.body.style.backgroundColor = "white", 150);
    resetGame();
  }
}

function btnpress() {
  let btn = this;
  btnflash(btn);
  userseq.push(btn.id);

  // play sound for that color
  let sound = document.getElementById("sound-" + btn.id);
  if (sound) sound.play();

  checkans(userseq.length - 1);
}

// wire up the color buttons
document.querySelectorAll(".btn").forEach(btn => btn.addEventListener("click", btnpress));

function resetGame() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
  startBtn.style.display = "inline-block"; // show button again
}
