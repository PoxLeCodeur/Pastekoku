import kaboom from "./node-modules/kaboom/dist/kaboom.mjs";

const k = kaboom({
  scale: 4,
  font: "monospace",
});
loadRoot(`assets/`);
loadSprite("dino", "bomberman.png", {
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

loadSprite("wall", "Block2.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    idle: {
      from: 0,
      to: 2,
      speed: 8,
      loop: true,
    },
  },
});
const SPEED = 300;

setGravity(0); // Désactiver la gravité pour la vue de dessus

const player = add([
  sprite("dino"),
  pos(center()),
  anchor("center"),
  area(),
  body(),
]);

const wall = add([
  sprite("wall"),
  pos(center()),
  anchor("center"),
  area(),
  body({ isStatic: true }),
  "obstacle",
]);

player.play("idle");

onKeyDown((key) => {
  movePlayer(key);
});

function movePlayer(direction) {
  // if (player.curAnim() !== "run") {
  //   player.play("run");
  // }
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

player.onCollide("wall", (obstacle) => {
  destroy(obstacle);
});

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