import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";

kaboom({
  background: [230, 221, 197],
  scale: 1,
});

loadSprite("bricks", "./assets/bricks.png", {
  sliceX: 3,
});

loadSprite("wood", "./assets/wood.png", {
  sliceX: 2,
});

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


scene("main", (levelIdx) => {
  const SPEED = 300;

  const levels = [
    [
      "===============",
      "=   h   xx x  =",
      "= =x=x=x=x=x= =",
      "= xxoox xoxxx =",
      "=x=x= =x=x=x=x=",
      "=xoooxx xxoxxx=",
      "= = =x=x=x=x= =",
      "=xxxooxxxxoxxx=",
      "=x=x=x=x=x= =x=",
      "=xxx oxxxxxh  =",
      "= =x=o=x=x=x= =",
      "=  x xx xxxx  =",
      "===============",
    ],
  ];

  const level = addLevel(levels[levelIdx], {
    tileWidth: 50,
    tileHeight: 50,
    pos: vec2(50, 50),
    tiles: {
      "=": () => [
        sprite("obstacle"),
        area(),
        body({ isStatic: true }),
        anchor("center"),
        "obstacle",
      ],
      "x": () => [
        sprite("wood"),
        area(),
        body({ isStatic: true }),
        anchor("center"),
        "wood",
      ],
      "o": () => [
        sprite("bricks"),
        area(),
        body({ isStatic: true }),
        anchor("center"),
        "bricks",
      ],
      "h": () => [
        sprite("mapApple", {anim: "idle"}),
        area(),
        body(),
        anchor("center"),
        "mapApple",
      ],
    },
  });
 
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
      sprite("apple"),
      pos(spawningPlayer.pos.add(50, 50)),
      anchor("center")
    ]);
    createdApple.play("idle");
    addKaboom(spawningPlayer.pos.add(50, 50));
  }
  

  // Input movement of PLayer One
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

  // Input movement of PLayer Two
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
