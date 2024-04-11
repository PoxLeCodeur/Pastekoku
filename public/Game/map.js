import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";

kaboom({
  background: [0, 0, 0],
});

loadSprite("bricks", "./assets/bricks.png", {
  sliceX: 3,
});
loadSprite("wood", "./assets/wood.png", {
  sliceX: 2,
});
loadSprite("obstacle", "./assets/obstacle.png");
loadSprite("golem", "golem.png", {
  sliceX: 10,
  sliceY: 1,
  anims: {
    idle: {
      from: 0,
      to: 9,
      speed: 8,
      loop: true,
    },
  },
});

scene("main", (levelIdx) => {
  var obstacle_block = "=";
  var wood_block = "x";
  var brick_block = "o";

  const SPEED = 300;

  const characters = {
    "@": {
      sprite: "player",
    },
  };

  const levels = [
    [
      "===============",
      "=@ xxx  xx x  =",
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
      obstacle_block: () => [
        sprite("obstacle"),
        area(),
        body({ isStatic: true }),
        anchor("center"),
        "obstacle",
      ],
      wood_block: () => [
        sprite("wood"),
        area(),
        body({ isStatic: true }),
        anchor("center"),
        "wood",
      ],
      brick_block: () => [
        sprite("bricks"),
        area(),
        body({ isStatic: true }),
        anchor("center"),
        "bricks",
      ],
      "@": () => [sprite("golem"), area(), body(), anchor("center"), "player"],
    },
  });

  const player = level.get("player")[0];

  const dirs = {
    left: LEFT,
    right: RIGHT,
    up: UP,
    down: DOWN,
  };

  for (const dir in dirs) {
    onKeyDown(dir, () => {
      player.move(dirs[dir].scale(SPEED));
    });
  }
});

go("main", 0);
