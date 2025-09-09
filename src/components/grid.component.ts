import { Component, Entity } from "excalibur";

export class GridComponent extends Component {
  public units: Map<string, Entity> = new Map();

  constructor(
    public cols: number,
    public rows: number,
  ) {
    super();
  }

  public getKey(x: number, y: number): string {
    return `${x},${y}`;
  }

  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
  }
}