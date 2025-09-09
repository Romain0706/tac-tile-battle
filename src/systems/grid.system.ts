import { Query, System, SystemType, World, Entity, Vector, Scene } from "excalibur";
import { GridComponent } from "../components/grid.component";
import { GridRendererComponent } from "../components/grid-renderer.component";
import { GridPositionComponent } from "../components/grid-position.component";
import { PositionComponent } from "../components/position.component";
import { UnitComponent } from "../components/unit.component";
import { GridEvents, UnitCreatedEvent, UnitPlacedEvent } from "../events/grid.events";
import { SceneWithGridEvents } from "../interfaces/scene-with-events.interface";

export class GridSystem extends System {
  public systemType = SystemType.Update;
  public priority = 0;

  private scene?: SceneWithGridEvents;

  private unitsQuery: Query<typeof GridPositionComponent | typeof PositionComponent | typeof UnitComponent>;
  private gridQuery: Query<typeof GridComponent | typeof GridRendererComponent>;

  constructor(world: World) {
    super();
    this.unitsQuery = world.query([GridPositionComponent, PositionComponent, UnitComponent]);
    this.gridQuery = world.query([GridComponent, GridRendererComponent]);
  }

  public initialize(world: World, scene: Scene): void {
    this.scene = scene as SceneWithGridEvents;
    
    // Listen to unit created events
    this.scene.events.on(GridEvents.UnitCreated, this.handleUnitCreated.bind(this));
  }

  public update(delta: number): void {
    this.syncUnitPositions();
  }

  private syncUnitPositions(): void {
    for (const unit of this.unitsQuery.entities) {
      const gridPos = unit.get(GridPositionComponent);
      const worldPos = unit.get(PositionComponent);
      
      // Get the grid entity (should only be one)
      for (const gridEntity of this.gridQuery.entities) {
        const renderer = gridEntity.get(GridRendererComponent);
        const tile = renderer.tileMap.getTile(gridPos.x, gridPos.y);
        if (tile) {
          worldPos.setWorldPosition(tile.center);
          if ('pos' in unit) {
            (unit as any).pos = tile.center;
          }
        }
        break; // Only process the first (and only) grid
      }
    }
  }

  public placeUnit(unit: Entity, x: number, y: number): boolean {
    // Get the grid entity (should only be one)
    for (const gridEntity of this.gridQuery.entities) {
      const gridComponent = gridEntity.get(GridComponent);
      const renderer = gridEntity.get(GridRendererComponent);
      
      if (!gridComponent.isValidPosition(x, y)) return false;

      const key = gridComponent.getKey(x, y);
      if (gridComponent.units.has(key)) return false;

      const tile = renderer.tileMap.getTile(x, y);
      if (!tile) return false;

      gridComponent.units.set(key, unit);
      tile.data.set('occupiedBy', unit);

      if (unit.has(GridPositionComponent)) {
        const gridPos = unit.get(GridPositionComponent);
        gridPos.setPosition(x, y);
      }

      return true;
    }
    return false;
  }

  public removeUnit(x: number, y: number): Entity | null {
    // Get the grid entity (should only be one)
    for (const gridEntity of this.gridQuery.entities) {
      const gridComponent = gridEntity.get(GridComponent);
      const renderer = gridEntity.get(GridRendererComponent);

      const key = gridComponent.getKey(x, y);
      const unit = gridComponent.units.get(key);
      if (!unit) return null;

      const tile = renderer.tileMap.getTile(x, y);
      if (tile) {
        tile.data.delete('occupiedBy');
      }

      gridComponent.units.delete(key);
      return unit;
    }
    return null;
  }

  public moveUnit(fromX: number, fromY: number, toX: number, toY: number): boolean {
    const unit = this.removeUnit(fromX, fromY);
    if (!unit) return false;

    if (this.placeUnit(unit, toX, toY)) {
      return true;
    } else {
      this.placeUnit(unit, fromX, fromY);
      return false;
    }
  }

  public isOccupied(x: number, y: number): boolean {
    for (const gridEntity of this.gridQuery.entities) {
      const gridComponent = gridEntity.get(GridComponent);
      const key = gridComponent.getKey(x, y);
      return gridComponent.units.has(key);
    }
    return true;
  }

  public getUnitAt(x: number, y: number): Entity | null {
    for (const gridEntity of this.gridQuery.entities) {
      const gridComponent = gridEntity.get(GridComponent);
      const key = gridComponent.getKey(x, y);
      return gridComponent.units.get(key) || null;
    }
    return null;
  }

  public getGridPosition(unit: Entity): { x: number, y: number } | null {
    if (!unit.has(GridPositionComponent)) return null;
    const gridPos = unit.get(GridPositionComponent);
    return { x: gridPos.x, y: gridPos.y };
  }

  public getWorldPosition(x: number, y: number): Vector | null {
    for (const gridEntity of this.gridQuery.entities) {
      const renderer = gridEntity.get(GridRendererComponent);
      const tile = renderer.tileMap.getTile(x, y);
      return tile ? tile.center : null;
    }
    return null;
  }

  private handleUnitCreated(event: UnitCreatedEvent): void {
    if (this.placeUnit(event.unit, event.x, event.y)) {
      // Emit unit placed event for other systems
      if (this.scene) {
        this.scene.events.emit(GridEvents.UnitPlaced, 
          new UnitPlacedEvent(event.unit, event.x, event.y));
      }
    } else {
      console.warn(`Failed to place unit on grid at (${event.x}, ${event.y})`);
    }
  }
}