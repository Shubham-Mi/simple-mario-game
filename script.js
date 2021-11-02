let gamebox = document.getElementById("gamebox");
let context = gamebox.getContext("2d");

var player_img = document.getElementById("player");
var enemy_img = document.getElementById("enemy");
var goal_img = document.getElementById("goal");

let next_level = document.getElementById("next_level");
let restart_level = document.getElementById("restart_level");
var $button = document.querySelector(".button");
let level = 1;
let flag = true;

let playerdefault = {
  x: 5,
  y: 285,
};

let player = {
  name: "mario",
  h: 45,
  w: 45,
  x: 5,
  y: 285,
  vx: 7,
  vy: 7,
};

let goal = {
  name: "princess",
  h: 45,
  w: 45,
  x: 945,
  y: 285,
};

let enemy = [
  {
    name: "turtle",
    h: 50,
    w: 50,
    x: 200,
    y: 0,
    vy: 3,
    d_vy: 4,
  },
  {
    name: "turtle",
    h: 50,
    w: 50,
    x: 450,
    y: 0,
    vy: 4,
    d_vy: 5,
  },
  {
    name: "turtle",
    h: 50,
    w: 50,
    x: 700,
    y: 0,
    vy: 5,
    d_vy: 6,
  },
];

function drawbox(box) {
  let img = document.getElementById(box.name);
  context.drawImage(img, box.x, box.y, box.w, box.h);
}

next_level.addEventListener("click", function () {
  var duration = 0.3,
    delay = 0.08;
  TweenMax.to(next_level, duration, { scaleY: 1.6, ease: Expo.easeOut });
  TweenMax.to(next_level, duration, {
    scaleX: 1.2,
    scaleY: 1,
    ease: Back.easeOut,
    easeParams: [3],
    delay: delay,
  });
  TweenMax.to(next_level, duration * 1.25, {
    scaleX: 1,
    scaleY: 1,
    ease: Back.easeOut,
    easeParams: [6],
    delay: delay * 3,
  });

  window.requestAnimationFrame(updateCanvas);
  flag = true;
  setTimeout(function () {
    next_level.hidden = true;
  }, 1000);
});

restart_level.addEventListener("click", function () {
  var duration = 0.3,
    delay = 0.08;
  TweenMax.to(restart_level, duration, { scaleY: 1.6, ease: Expo.easeOut });
  TweenMax.to(restart_level, duration, {
    scaleX: 1.2,
    scaleY: 1,
    ease: Back.easeOut,
    easeParams: [3],
    delay: delay,
  });
  TweenMax.to(restart_level, duration * 1.25, {
    scaleX: 1,
    scaleY: 1,
    ease: Back.easeOut,
    easeParams: [6],
    delay: delay * 3,
  });

  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y = 1;
  }
  player.x = playerdefault.x;
  player.y = playerdefault.y;
  window.requestAnimationFrame(updateCanvas);
  flag = true;
  setTimeout(function () {
    restart_level.hidden = true;
  }, 1000);
});

document.addEventListener("keydown", moveplayer);
function moveplayer(e) {
  if (flag == false) {
    return;
  }

  if (e.code == "ArrowLeft") {
    player.x -= player.vx;
  } else if (e.code == "ArrowRight") {
    player.x += player.vx;
  } else if (e.code == "ArrowUp") {
    player.y -= player.vy;
  } else if (e.code == "ArrowDown") {
    player.y += player.vy;
  }

  if (player.x + player.w + 5 >= gamebox.width) {
    player.x = gamebox.width - player.w - 5;
  } else if (player.x < 5) {
    player.x = 5;
  }

  if (player.y + player.h + 5 >= gamebox.height) {
    player.y = gamebox.height - player.h - 5;
  } else if (player.y < 5) {
    player.y = 5;
  }
}

function updateEnemyPosition() {
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].vy;
    if (enemy[i].y + enemy[i].h >= gamebox.height || enemy[i].y <= 0) {
      enemy[i].vy *= -1;
    }
  }
}

function checkCollision() {
  // Player corner positions
  let pl_x = player.x;
  let pl_y = player.y;
  let pl_w_x = player.x + player.w;
  let pl_h_y = player.y + player.h;

  for (let i = 0; i < enemy.length; i++) {
    // Enemy corner positions
    let en_x = enemy[i].x;
    let en_y = enemy[i].y;
    let en_w_x = enemy[i].x + enemy[i].w;
    let en_h_y = enemy[i].y + enemy[i].h;

    if (pl_x <= en_x && pl_w_x >= en_x && pl_y <= en_y && pl_h_y >= en_y) {
      // Check TopLeft enemy corner with BottomRight player corner
      return true;
    } else if (
      pl_x <= en_x &&
      pl_w_x >= en_x &&
      pl_y <= en_h_y &&
      pl_h_y >= en_h_y
    ) {
      // Check BottomLeft enemy corner with TopRight player corner
      return true;
    } else if (
      en_x <= pl_x &&
      en_w_x >= pl_x &&
      en_y <= pl_y &&
      en_h_y >= pl_y
    ) {
      // Check TopLeft player corner with BottomRight enemy corner
      return true;
    } else if (
      en_x <= pl_x &&
      en_w_x >= pl_x &&
      en_y <= pl_h_y &&
      en_h_y >= pl_h_y
    ) {
      // Check BottomLeft player corner with TopRight enemy corner
      return true;
    }
  }

  return false;
}

function levelComplete() {
  // Player corner positions
  let pl_x = player.x;
  let pl_y = player.y;
  let pl_w_x = player.x + player.w;
  let pl_h_y = player.y + player.h;

  // Goal corner positions
  let gl_x = goal.x;
  let gl_y = goal.y;
  let gl_w_x = goal.x + goal.w;
  let gl_h_y = goal.y + goal.h;

  if (pl_x <= gl_x && pl_w_x >= gl_x) {
    if (pl_y <= gl_y && pl_h_y >= gl_y) {
      // Check TopLeft enemy corner with BottomRight player corner
      return true;
    } else if (pl_y <= gl_h_y && pl_h_y >= gl_h_y) {
      // Check BottomLeft enemy corner with TopRight player corner
      return true;
    }
  } else if (pl_x <= gl_w_x && pl_w_x >= gl_w_x) {
    if (pl_y <= gl_y && pl_h_y >= gl_y) {
      // Check TopRight enemy corner with BottomLeft player corner
      return true;
    } else if (pl_y <= gl_h_y && pl_h_y >= gl_h_y) {
      // Check BottomRight enemy corner with TopLeft player corner
      return true;
    }
  }

  return false;
}

function updateCanvas() {
  // Show Level
  level_div = document.getElementById("level");
  level_div.innerHTML = "Level " + level;

  // Update enemy position
  updateEnemyPosition();

  // Clear the canvas
  context.clearRect(0, 0, gamebox.width, gamebox.height);

  // Display enemies
  for (let i = 0; i < enemy.length; i++) {
    drawbox(enemy[i]);
  }

  // Display player and goal
  drawbox(player);
  drawbox(goal);

  let collision = checkCollision();
  let levelup = levelComplete();
  if (collision) {
    // Collision, restart level
    flag = false;
    context.font = "80pt serif";
    context.fillStyle = "brown";
    context.fillRect(200, 240, 580, 110);
    context.strokeText("Game Over", 230, 330);
    restart_level.hidden = false;
  } else if (levelup) {
    // Level Up
    flag = false;
    level++;
    console.log("PLayer Leveled Up");

    for (let i = 0; i < enemy.length; i++) {
      enemy[i].y = 1;
      enemy[i].vy = enemy[i].d_vy;
      enemy[i].d_vy += 1;
    }
    player.x = playerdefault.x;
    player.y = playerdefault.y;

    context.font = "60pt serif";
    context.fillStyle = "brown";
    context.fillRect(200, 240, 580, 130);
    context.strokeText("Level Complete", 230, 330);
    next_level.hidden = false;
  } else {
    // Request Next Frame
    window.requestAnimationFrame(updateCanvas);
  }
}

updateCanvas();
