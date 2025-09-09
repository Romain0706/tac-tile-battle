import { GameEvent, Actor } from "excalibur";
import { Team, UnitClass } from "../components/unit.component";

// Type-safe event constants - prevents typos and provides better IDE support
export const GridEvents = {
  SpawnUnit: 'spawn-unit',
  UnitCreated: 'unit-created', 
  UnitPlaced: 'unit-placed',
  UnitMoved: 'unit-moved'
} as const;

// Type for event keys - useful for validation
export type GridEventType = typeof GridEvents[keyof typeof GridEvents];

export interface GridEventMap {
  'spawn-unit': SpawnUnitEvent;
  'unit-created': UnitCreatedEvent;
  'unit-placed': UnitPlacedEvent;
  'unit-moved': UnitMovedEvent;
}

export class SpawnUnitEvent extends GameEvent<any, any> {
  constructor(
    public x: number,
    public y: number,
    public team: Team,
    public unitClass: UnitClass,
    public name?: string
  ) {
    super();
  }
}

export class UnitCreatedEvent extends GameEvent<any, any> {
  constructor(
    public unit: Actor,
    public x: number,
    public y: number
  ) {
    super();
  }
}

export class UnitPlacedEvent extends GameEvent<any, any> {
  constructor(
    public unit: Actor,
    public x: number,
    public y: number
  ) {
    super();
  }
}

export class UnitMovedEvent extends GameEvent<any, any> {
  constructor(
    public unit: Actor,
    public fromX: number,
    public fromY: number,
    public toX: number,
    public toY: number
  ) {
    super();
  }
}