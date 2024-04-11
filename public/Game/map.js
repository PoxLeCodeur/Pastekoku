import { Rect } from "kaboom";
import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";

kaboom({
  scale: 4,
  background: [0, 0, 0],
});

loadSprite("bricks", "./assets/bricks.png");
loadSprite("wood", "./assets/wood.png");
loadSprite("obstacle", "./assets/obstacle.png");
loadSprite("player", "./assets/player.png");

addLevel(
  [
    "xxxxxxxxxxxxxxx",
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
  ],
  {
    tileWidth: 50,
    tileHeight: 50,
    tiles: {
      " ": () => [sprite("floor", { frame: ~~rand(0, 8) })],
    },
  }
);

var wood_block = "x";
var brick_block = "o";

const map = addLevel(
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
  {
    tileWidth: 50,
    tileHeight: 50,
    tiles: {
      "=": () => [
        sprite("obstacle"),
        area(),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
      ],
      wood_block: () => [
        sprite("wood"),
        area(),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
      ],
      brick_block: () => [
        sprite("bricks"),
        area(),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
      ],
    },
  }
);

const player = map.spawn(
  [
    sprite("player", { anim: "idle" }),
    area({ shape: new Rect(vec2(0, 6), 12, 12) }),
    body(),
    tile(),
  ],
  2,
  2
);

map.spawn(
  [
    sprite("ogre"),
    area({ scale: 0.5 }),
    body({ isStatic: true }),
    tile({ isObstacle: true }),
  ],
  5,
  4
);

const SPEED = 120;

const dirs = {
  left: LEFT,
  right: RIGHT,
  up: UP,
  down: DOWN,
};

player.onUpdate(() => {
  camPos(player.pos);
});

onKeyDown("right", () => {
  player.flipX = false;
  sword.flipX = false;
  player.move(SPEED, 0);
  sword.pos = vec2(-4, 9);
});

onKeyDown("left", () => {
  player.flipX = true;
  sword.flipX = true;
  player.move(-SPEED, 0);
  sword.pos = vec2(4, 9);
});

onKeyDown("up", () => {
  player.move(0, -SPEED);
});

onKeyDown("down", () => {
  player.move(0, SPEED);
});

["left", "right", "up", "down"].forEach((key) => {
  onKeyPress(key, () => {
    player.play("run");
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
