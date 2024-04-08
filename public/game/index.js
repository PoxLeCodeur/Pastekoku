class bomb {
  constructor(
    id,
    name,
    radius,
    diagRadius,
    cooldown,
    imageLink,
    timerExplosion
  ) {
    this.id = id;
    this.name = name;
    this.radius = radius;
    this.diagRadius = diagRadius;
    this.cooldown = cooldown;
    this.imageLink = imageLink;
    this.timerExplosion = timerExplosion;
  }
}

class specialBomb {
  constructor(
    id,
    name,
    explosionType,
    radius,
    timer,
    charges,
    cooldown,
    imageLink
  ) {
    this.id = id;
    this.name = name;
    this.explosionType = explosionType;
    this.radius = radius;
    this.timer = timer;
    this.charges = charges;
    this.cooldown = cooldown;
    this.imageLink = imageLink;
  }
}

class obstacles {
  constructor(id, name, destructible, imageLink, hitPoints) {
    this.id = id;
    this.name = name;
    this.destructible = destructible;
    this.imageLink = imageLink;
    this.hitPoints = this.hitPoints;
  }
}

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
  });
