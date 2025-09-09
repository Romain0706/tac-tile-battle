import { Component } from "excalibur";

export class GridPositionComponent extends Component {
  constructor(
    public x: number,
    public y: number
  ) {
    super();
  }

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public equals(other: GridPositionComponent): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public toString(): string {
    return `${this.x},${this.y}`;
  }
}