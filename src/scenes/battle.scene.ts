import { Engine, Scene } from "excalibur";
import { Grid } from "../actors/grid.actor";

export class Battle extends Scene {
    private _grid: Grid;

    constructor() {
        super();

        this._grid = new Grid();
    }

    public onInitialize(engine: Engine): void {
        this.add(this._grid);
    }
}