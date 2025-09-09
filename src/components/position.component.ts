import { Component, Vector } from "excalibur";

export class PositionComponent extends Component {
  constructor(
    public worldPosition: Vector
  ) {
    super();
  }

  public setWorldPosition(pos: Vector): void {
    this.worldPosition = pos;
  }

  public get x(): number {
    return this.worldPosition.x;
  }

  public get y(): number {
    return this.worldPosition.y;
  }
}