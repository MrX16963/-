let score = 0;
let missed = 0;
let gameInterval;

function startGame() {
  score = 0;
  missed = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("missed").textContent = missed;
  clearInterval(gameInterval);
  gameInterval = setInterval(spawnObject, 1000);
  document.getElementById("bgMusic").play();
}

function spawnObject() {
  const type = Math.random();
  if (type < 0.7) {
    createStar();
  } else {
    createBlackhole();
  }
}

function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  star.textContent = "⭐";
  star.style.left = Math.random() * (window.innerWidth - 30) + "px";
  star.style.top = "0px";

  star.addEventListener("click", () => {
    score++;
    document.getElementById("score").textContent = score;
    star.remove();
  });

  star.addEventListener("animationend", () => {
    if (document.body.contains(star)) {
      missed++;
      document.getElementById("missed").textContent = missed;
      star.remove();
      if (missed >= 5) {
        endGame();
      }
    }
  });

  document.getElementById("gameArea").appendChild(star);
}

function createBlackhole() {
  const hole = document.createElement("div");
  hole.classList.add("blackhole");
  hole.textContent = "🕳️";
  hole.style.left = Math.random() * (window.innerWidth - 30) + "px";
  hole.style.top = "0px";

  hole.addEventListener("click", () => {
    endGame("You clicked a black hole!");
  });

  hole.addEventListener("animationend", () => {
    hole.remove();
  });

  document.getElementById("gameArea").appendChild(hole);
}

function endGame(message = "Game Over!") {
  clearInterval(gameInterval);
  alert(`${message} Final Score: ${score}`);
}
