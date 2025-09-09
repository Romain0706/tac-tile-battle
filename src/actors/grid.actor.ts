import { Actor, Color, Rectangle, TileMap, Vector } from "excalibur";
import { COLORS, GRID_COLS, GRID_OFFSET_X, GRID_OFFSET_Y, GRID_ROWS, TILE_SIZE } from "../config/constants";

export class Grid extends Actor {
    private tileMap: TileMap;

    constructor() {
        super()
        
        this.tileMap = new TileMap({
            pos: new Vector(GRID_OFFSET_X, GRID_OFFSET_Y),
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
            columns: GRID_COLS,
            rows: GRID_ROWS
        });

        this.setupTiles()
    }

    setupTiles() {
        for (let y = 0; y < GRID_ROWS; y++) {
            for (let x = 0; x < GRID_COLS; x++) {
                const tile = this.tileMap.getTile(x, y);
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

        this.addChild(this.tileMap);
    }
}