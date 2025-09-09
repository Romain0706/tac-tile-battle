import { Entity, TileMap, Vector, Color, Rectangle } from "excalibur";
import { GridComponent } from "../components/grid.component";
import { GridRendererComponent } from "../components/grid-renderer.component";
import { COLORS, GRID_COLS, GRID_OFFSET_X, GRID_OFFSET_Y, GRID_ROWS, TILE_SIZE } from "../config/constants";

export class GridEntity extends Entity {
  constructor() {
    super();

    // Create the TileMap for visual rendering
    const tileMap = new TileMap({
      pos: new Vector(GRID_OFFSET_X, GRID_OFFSET_Y),
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
      columns: GRID_COLS,
      rows: GRID_ROWS
    });

    // Setup tile visuals
    this.setupTiles(tileMap);

    // Add both components to this single entity
    this.addComponent(new GridComponent(GRID_COLS, GRID_ROWS));
    this.addComponent(new GridRendererComponent(tileMap));

    // Add the TileMap as a child for rendering
    this.addChild(tileMap);
  }

  private setupTiles(tileMap: TileMap): void {
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLS; x++) {
        const tile = tileMap.getTile(x, y);
        if (tile) {
          const tileGraphic = new Rectangle({
            width: TILE_SIZE,
            height: TILE_SIZE,
            color: Color.fromHex((x + y) % 2 === 0 ? COLORS.TILE_EVEN : COLORS.TILE_ODD),
          });
          tile.addGraphic(tileGraphic);
        }
      }
    }
  }
}