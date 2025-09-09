import { Scene, EventEmitter, SceneEvents } from "excalibur";
import { GridEventMap } from "../events/grid.events";

// Composition pattern - extends rather than intersects
export interface GameEvents extends SceneEvents {
  // Grid Events
  'spawn-unit': GridEventMap['spawn-unit'];
  'unit-created': GridEventMap['unit-created'];
  'unit-placed': GridEventMap['unit-placed'];
  'unit-moved': GridEventMap['unit-moved'];
}

export interface SceneWithGridEvents extends Scene {
  events: EventEmitter<GameEvents>;
}