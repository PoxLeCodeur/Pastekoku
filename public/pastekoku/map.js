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
  },
});
loadSprite("apple", "Explosion_Apple.png", {
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
      "=  xxx  xx x  =",
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
      "@": () => [sprite("golem"), area(), body(), anchor("center"), "player"],
    },
  });

  // const player = level.get("player")[0];
  const player = level.spawn(
    [sprite("golem", { anim: "idle" }), area(), body(), anchor("center"), tile()],
    1,
    1
  );

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
