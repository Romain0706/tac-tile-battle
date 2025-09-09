import { Component, Entity } from "excalibur";

 export interface Cell {
    x: number;
    y: number;
    occupiedBy: Entity | null;
  }

export class GridComponent extends Component {
    public cells: Cell[][] = [];

    constructor(
        cols: number,
        rows: number,
    ) {
        super();

        for (let y = 0; y < rows; y++) {
            this.cells[y] = [];
            for (let x = 0; y < cols; y++) {
                this.cells[y][x] = {
                    x,
                    y,
                    occupiedBy: null
                };
            }
        }
    }
}