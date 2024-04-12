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
      "=xxx oxxxxxxxx=",
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
      "@": () => [sprite("golem", { anim: "idle" }),
      pos(center()),
      anchor("center"),
      area(),
      body(),
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
 
  // const player = level.get("player")[0];
  const player = level.spawn(
    [sprite("golem", { anim: "idle" }), area(), body(), anchor("center"), tile()],
    1,
    1
  );

  player.onCollide("mapApple", (mapApple) => {
    destroy(mapApple);
   });

  onKeyPress("space", () => {
    const createdApple = add([
      sprite("apple"),
      pos(player.pos.add(50,50)),
      anchor("center"),
    ]);
    createdApple.play("idle");
    addKaboom(player.pos.add(50,50));
  });
  
["left", "right", "up", "down"].forEach((key) => {
  onKeyDown(key, () => {
    player.play("run");
    movePlayer(key);
  });
  onKeyRelease(key, () => {
    if (
      !isKeyDown("left") &&
      !isKeyDown("right") &&
      !isKeyDown("up") &&
      !isKeyDown("down")
    ) {
      player.play("idle");
    }
  });
});

function movePlayer(direction) {
  switch (direction) {
    case "left":
      player.move(-SPEED, 0);
      player.flipX = true;
      break;
    case "right":
      player.move(SPEED, 0);
      player.flipX = false;
      break;
    case "up":
      player.move(0, -SPEED);
      break;
    case "down":
      player.move(0, SPEED);
      break;
  }
}});

go("main", 0);
