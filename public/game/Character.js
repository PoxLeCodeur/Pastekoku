import kaboom from "./node-modules/kaboom/dist/kaboom.mjs";

const k = kaboom({
  background: [152, 251, 152],
  scale: 4,
  font: "monospace",
});
loadRoot(`assets/`);
loadSprite("dino", "all_sprites.png", {
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
      from: 11,
      to: 13,
      speed: 8,
      loop: true,
    },
  },
});
loadSprite("wall", "Wall.png", {
  sliceX: 1,
  sliceY: 1,
});
loadSprite("briquasse", "Wall.png", {
  sliceX: 1,
  sliceY: 1,
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
loadSprite("mapApple", "Map_Apple.png", {
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

const SPEED = 300;
setGravity(0);

const player = add([
  sprite("dino"),
  pos(center()),
  anchor("center"),
  area(),
  body(),
]);
player.play("idle");
const wall = add([
  sprite("wall"),
  pos(center()),
  anchor("center"),
  area(),
  body({ isStatic: true }),
]);
const mapApple = add([
  sprite("mapApple"),
  pos(100, 200),
  anchor("center"),
  area(),
  body(),
  "mapApple",
]);
mapApple.play("idle");

// player.onCollide("mapApple", (mapApple) => {
//   destroy(mapApple);
// });

var apple = add([sprite("apple"), pos(player.pos), anchor("center")]);
apple.play("idle");

onKeyPress("space", () => {
  add([sprite("apple"), pos(player.pos), anchor("center")]);
  addKaboom(player.pos);
});

onKeyDown((key) => {
  movePlayer(key);
  player.play("run");
});
if (!isKeyDown("left") && !isKeyDown("right")) {
  player.play("idle");
} else {
  player.play("run");
}

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
}

function stopPlayer() {
  if (
    !isKeyDown("left") &&
    !isKeyDown("right") &&
    !isKeyDown("up") &&
    !isKeyDown("down")
  ) {
    if (player.isGrounded()) {
      player.play("idle");
    }
  }
}
