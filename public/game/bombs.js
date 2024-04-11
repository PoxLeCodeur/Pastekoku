class Fruit {
  constructor(name, damage, radiusX, radiusY, diagRadius, renew, timer, speed) {
    this.amount = 1;
    this.name = name;
    this.damage = damage;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.diagRadius = diagRadius;
    this.renew = renew;
    this.timer = timer;
    this.speed = speed;
  }

  place() {
    this.amount -= 1;
    // attendre la valeur timer avant que la bombe explode
    if (diagRadius > 0) {
      // explosion en cercle (traverse les mur)
    } else {
      // explosion classique
    }
    this.amount += 1;
  }
}

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
