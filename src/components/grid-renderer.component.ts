import { Component, TileMap } from "excalibur";

export class GridRendererComponent extends Component {
  constructor(public tileMap: TileMap) {
    super();
  }
}