import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";

const k = kaboom({
  scale: 4,
  font: "monospace",
});

loadRoot(`assets/`);
loadSprite("boom", "/explosion.png", {
  sliceX: 7,
  anims: {
    "explode": {
      from: 0,
      to: 6,
      speed: 10,
      loop: false,
    },
  },
});

const boom = add([sprite("boom"), pos(-200, -200), anchor("center")]);

class Fruit {
  constructor(name, damage, radiusX, radiusY, diagRadius, renew, timer, speed) {
    const blocksize = 20;
    this.amount = 1;
    this.name = name;
    this.damage = damage;
    this.radiusX = radiusX * blocksize;
    this.radiusY = radiusY * blocksize;
    this.diagRadius = diagRadius * blocksize;
    this.renew = renew;
    this.timer = timer;
    this.speed = speed;
  }

  explode(obstacles, players, posX, posY) {
    if (this.diagRadius > 0) {
      this.radiusExplode(obstacles, players, posX, posY)
    } else {
      this.lineExplode(obstacles, players, posX, posY)
    }
  }

  radiusExplode(obstacles, players, posX, posY) {
    const blocksize = 20;
    for (
      let x = posX - this.diagRadius;
      x <= posX + this.diagRadius;
      x = x + blocksize
    ) {
      for (
        let y = posY - this.diagRadius;
        y <= posY + this.diagRadius;
        y = y + blocksize
      ) {
          const boom = add([sprite("boom"), pos(x, y), anchor("center")]);
          boom.play("explode");
        const player = players.find(
          (player) => player.posX === x && player.posY === y
        );
        if (player) {
          if (player.posX == x && player.posY == y) {
            player.hp -= this.damage;
          }
        }
        const obstacle = obstacles.find(
          (obstacle) => obstacle.posX === x && obstacle.posY === y
        );
        if (obstacle) {
          if (player.posX == x && player.posY == y) {
            obstacle.hp -= this.damage;
          }
        }
      }
    }
    console.log("radiusExplode done")
  }

  lineExplode(obstacles, players, posX, posY) {
    const blocksize = 20;
    for (
      let x = posX - this.radiusX;
      x <= posX + this.radiusX;
      x = x + blocksize
    ) {
      for (
        let y = posY - this.radiusY;
        y <= posY + this.radiusY;
        y = y + blocksize
      ) {
        if ((x != posX && y == posY) || (y != posY && x == posX) || (x == posX && y == posY)) {
          const boom = add([sprite("boom"), pos(x, y), anchor("center")]);
          boom.play("explode");
        }
        const player = players.find(
          (player) => player.posX === x && player.posY === y
        );
        if (player) {
          if (
            (player.posX < posX + this.radiusX &&
              player.posX > posX + this.radiusX &&
              player.posY == posY) ||
            (player.posY < posY + this.radiusY &&
              player.posY > posY + this.radiusY &&
              player.posX == posX)
          ) {
            player.hp -= this.damage;
          }
        }
        const obstacle = obstacles.find(
          (obstacle) => obstacle.posX === x && obstacle.posY === y
        );
        if (obstacle) {
          if (
            (obstacle.posX < posX + this.radiusX &&
              obstacle.posX > posX + this.radiusX &&
              obstacle.posY == posY) ||
            (obstacle.posY < posY + this.radiusY &&
              obstacle.posY > posY + this.radiusY &&
              obstacle.posX == posX)
          ) {
            obstacle.hp -= this.damage;
          }
        }
      }
    }
  }
}


// DEBUG :
// const test = new Fruit("test", 1, 0, 0, 3, true, 5, 0);

// onMousePress(() => {
//   test.explode([], [], mousePos().x, mousePos().y);
// });

// onKeyPress(() => {
//   test.radiusExplode([], [], mousePos().x, mousePos().y);
// });

let bombs = [];
let dbRes = [];

const url = "http://localhost:8081/bombs";

fetch(url, {
  method: "get",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
})
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonResponse) {
    console.log(jsonResponse);
    dbRes = jsonResponse.data;
    for (let currentBomb = 0; currentBomb < dbRes.length; currentBomb++) {
      bombs.push(
        new Fruit(dbRes[currentBomb].name, 1, 3, 3, 0, true, 10000, 0)
      );
    }
    console.log(bombs);
  });
