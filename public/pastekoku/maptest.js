import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";

kaboom({
  background: [0,0,0],
  scale: 1.5,
});

loadSprite("bricks", "./assets/bricks.png", {
  sliceX: 3,
});

loadSprite("wood", "./assets/wood.png", {
  sliceX: 2,
});
loadSprite("floor", "./assets/floor.png");
loadSprite("obstacle", "./assets/obstacle.png");

loadSprite("golem", "./assets/all_sprites.png", {
  sliceX: 10,
  sliceY: 2,
  anims: {
    idle: {
      from: 0,
      to: 9,
      speed: 8,
      loop: true,
    },
    run: {
      from: 10,
      to: 13,
      speed: 8,
      loop: true,
    },
  },
});

loadSprite("enemy", "./assets/enemy.png", {
  sliceX: 10,
  sliceY: 2,
  anims: {
    idle: {
      from: 0,
      to: 9,
      speed: 8,
      loop: true,
    },
    run: {
      from: 10,
      to: 13,
      speed: 8,
      loop: true,
    },
  },
});

loadSprite("mapApple", "./assets/Map_Apple.png", {
  sliceX: 8,
  sliceY: 1,
  anims: {
    idle: {
      from: 0,
      to: 7,
      speed: 4,
      loop: true,
    },
  },
});

loadSprite("apple", "./assets/Explosion_Apple.png", {
  sliceX: 6,
  sliceY: 1,
  anims: {
    idle: {
      from: 0,
      to: 5,
      speed: 4,
      loop: true,
    },
  },
});

loadSprite("boom", "./assets/explosion.png", {
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
  }

  lineExplode(obstacles, players, posX, posY) {
    const blocksize = 30;
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

let bombs = [];
let dbRes = [];

const url = "http://localhost:8081/bomb";

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
    dbRes = jsonResponse.data;
    for (let currentBomb = 0; currentBomb < dbRes.length; currentBomb++) {
      bombs.push(
        new Fruit(dbRes[currentBomb].name, 1, 3, 3, 0, true, 10000, 0)
      );
    };
  });

scene("main", (levelIdx) => {
  const SPEED = 300;

  const base = [
    [
      "===============",
      "=             =",
      "= = = = = = = =",
      "=             =",
      "= = = = = = = =",
      "=             =",
      "= = = = = = = =",
      "=             =",
      "= = = = = = = =",
      "=             =",
      "= = = = = = = =",
      "=             =",
      "===============",
    ],
  ];

  const levels = [
    [
      "===============",
      "=       xx x  =",
      "= =x=x=x=x=x= =",
      "= xxoox xoxxx =",
      "=x=x= =x=x=x=x=",
      "=xoooxx xxoxxx=",
      "= = =x=x=x=x= =",
      "=xxxooxxxxoxxx=",
      "=x=x=x=x=x= =x=",
      "=xxx oxxxxx   =",
      "= =x=o=x=x=x= =",
      "=  x xx xxxx  =",
      "===============",
    ],
  ];
  const level = addLevel(base[levelIdx], {
      tileWidth: 50,
      tileHeight: 50,
      pos: vec2(50, 50),
      tiles: {
        " ": () => [
          area(),
          sprite("floor"),
          anchor("center"),
          "floor",
        ],
        "=": () => [
          sprite("obstacle"),
          area(),
          body({ isStatic: true }),
          anchor("center"),
          "obstacle",
        ],
      }});

  function createMap(level) {
    const matrix = [];

    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            const char = level[y][x];
            if (char !== '=') {
                matrix.push([char, x, y]);
            }
        }
    }

    return matrix;
  }

  map = createMap(levels)

  function generateMap(map) {
    let spawnCode = '';
    let cpt = 0;
    for (const [char, x, y] of map) {

        let tileType;

        switch (char) {
            case '':
                tileType = "floor";
                break;
            case 'x':
                tileType = "wood";
                break;
            case 'o':
                tileType = "bricks";
                break;
            default:
                tileType = "floor";
                break;
        };
        cpt += 1;

        let spawnCode = new Function('level', 'sprite', 'area', 'anchor', 'tile', `let ${tileType}${cpt} = level.spawn([sprite("${tileType}"), area(), anchor("center"), tile()], ${x}, ${y});`);
        spawnCode(level, sprite, area, anchor, tile)

    }

    return spawnCode;
}


generateMap(map)




  // const level = addLevel(levels[levelIdx], {
  //   tileWidth: 50,
  //   tileHeight: 50,
  //   pos: vec2(50, 50),
  //   tiles: {
  //     " ": () => [
  //       area(),
  //       sprite("floor"),
  //       anchor("center"),
  //       "floor",
  //     ],
  //     "=": () => [
  //       sprite("obstacle"),
  //       area(),
  //       body({ isStatic: true }),
  //       anchor("center"),
  //       "obstacle",
  //     ],
  //     "x": () => [
  //       sprite("wood"),
  //       area(),
  //       body({ isStatic: true }),
  //       anchor("center"),
  //       "wood",
  //     ],
  //     "o": () => [
  //       sprite("bricks"),
  //       area(),
  //       body({ isStatic: true }),
  //       anchor("center"),
  //       "bricks",
  //     ],
  //     "h": () => [
  //       sprite("mapApple", {anim: "idle"}),
  //       area(),
  //       body(),
  //       anchor("center"),
  //       "mapApple",
  //     ],
      
  //   },
  // });
 
  // create Player One
  const playerOne = level.spawn(
    [sprite("golem", { anim: "idle" }), area(), body(), anchor("center"), tile()],
    1,
    1
  );
  // create Player Two 
  const playerTwo = level.spawn(
    [sprite("enemy", { anim: "idle" }), area(), body(), anchor("center"), tile()],
    13,
    10,
  );

  //Player One get apple
  playerOne.onCollide("mapApple", (mapApple) => {
    destroy(mapApple);
   });

  //Player Two get apple
  playerTwo.onCollide("mapApple", (mapApple) => {
  destroy(mapApple);
  });

  // Player One put a bomb
  onKeyPress("space", () => {
    createBomb(playerOne);

  });

  // Player Two put a bomb
  onKeyPress("e", () => {
    createBomb(playerTwo);
  });

  function createBomb(spawningPlayer) {
    const createdApple = add([
      timer(),
      sprite("apple"),
      pos(spawningPlayer.pos.add(50, 50)),
      anchor("center")
    ]);
    createdApple.play("idle");
    createdApple.wait(2, () => {
      bombs[0].explode([], [], createdApple.pos.x, createdApple.pos.y)
      destroy(createdApple)
    });

  }
  

  // Input movement of Player One
  ["left", "right", "up", "down"].forEach((key) => {
    onKeyDown(key, () => {
      playerOne.play("run");
      movePlayerOne(key);
    });
    onKeyRelease(key, () => {
      if (
        !isKeyDown("left") &&
        !isKeyDown("right") &&
        !isKeyDown("up") &&
        !isKeyDown("down")
      ) {
        playerOne.play("idle");
      }
    });
  });

  // Input movement of Player Two
  ["q", "d", "z", "s"].forEach((key) => {
    onKeyDown(key, () => {
      playerTwo.play("run");
      movePlayerTwo(key);
    });
    onKeyRelease(key, () => {
      if (
        !isKeyDown("q") &&
        !isKeyDown("d") &&
        !isKeyDown("z") &&
        !isKeyDown("s")
      ) {
        playerTwo.play("idle");
      }
    });
  });


  // Movement of player one
  function movePlayerOne(direction) {
    switch (direction) {
      case "left":
        playerOne.move(-SPEED, 0);
        playerOne.flipX = true;
        break;
      case "right":
        playerOne.move(SPEED, 0);
        playerOne.flipX = false;
        break;
      case "up":
        playerOne.move(0, -SPEED);
        break;
      case "down":
        playerOne.move(0, SPEED);
        break;
    }
  };
  // Movement of player two
  function movePlayerTwo(direction) {
    switch (direction) {
      case "q":
        playerTwo.move(-SPEED, 0);
        playerTwo.flipX = true;
        break;
      case "d":
        playerTwo.move(SPEED, 0);
        playerTwo.flipX = false;
        break;
      case "z":
        playerTwo.move(0, -SPEED);
        break;
      case "s":
        playerTwo.move(0, SPEED);
        break;
    };
  };  
});

go("main", 0);
