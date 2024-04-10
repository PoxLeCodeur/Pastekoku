import { entity } from "engine/entity.js";

export class LevelMap extends entity {
  constructor() {
    super({ x: 0, y: 0 });

    this.tileMap = [...tileMap];
    this.image = document.querySelector("img#stage");
    this.stageImage = new OffscreenCanvas(1024, 1024);

    this.buildStage();
  }

  updateStageImageAt(columnIndex, rowIndex, tile) {
    const context = this.stageImage.getContext("2d");
    drawTile;
  }

  buildStage() {
    for (let rowIndex = 0; rowIndex < this.tileMap.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < this.tileMap[rowIndex].length;
        columnIndex++
      ) {
        const tile = this.tileMap[rowIndex][columnIndex];
        this.updateStageImageAt(columnIndex, rowIndex, tile);
      }
    }
  }

  update = () => undefined;

  draw(context, camera) {
    // Add your main draw calls here
  }
}
