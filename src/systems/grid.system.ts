import { Query, System, SystemType, World, Entity, Vector, Scene } from "excalibur";
import { Grid } from "../actors/grid.actor";
import { GridComponent } from "../components/grid.component";
import { GridPositionComponent } from "../components/grid-position.component";
import { PositionComponent } from "../components/position.component";
import { UnitComponent } from "../components/unit.component";

export class GridSystem extends System {
  public systemType = SystemType.Update;
  public priority = 0;

  private grid?: Grid;
  private gridComponent?: GridComponent;
  private scene?: Scene;

  private unitsQuery: Query<typeof GridPositionComponent | typeof PositionComponent | typeof UnitComponent>;
  private gridQuery: Query<typeof GridComponent>;

  constructor(world: World) {
    super();
    this.unitsQuery = world.query([GridPositionComponent, PositionComponent, UnitComponent]);
    this.gridQuery = world.query([GridComponent]);
  }

  public initialize(world: World, scene: Scene): void {
    this.scene = scene;
    this.findGridEntities();
  }

  public update(delta: number): void {
    this.syncUnitPositions();
  }

  private findGridEntities(): void {
    if (this.grid && this.gridComponent) return;

    if (this.scene) {
      for (const entity of this.scene.entities) {
        if (entity instanceof Grid) {
          this.grid = entity;
        }
      }
    }

    for (const entity of this.gridQuery.entities) {
      this.gridComponent = entity.get(GridComponent);
      break;
    }
  }

  private syncUnitPositions(): void {
    if (!this.grid || !this.gridComponent) return;

    for (const unit of this.unitsQuery.entities) {
      const gridPos = unit.get(GridPositionComponent);
      const worldPos = unit.get(PositionComponent);
      
      const tile = this.grid.tileMap.getTile(gridPos.x, gridPos.y);
      if (tile) {
        worldPos.setWorldPosition(tile.center);
        if ('pos' in unit) {
          (unit as any).pos = tile.center;
        }
      }
    }
  }

  public placeUnit(unit: Entity, x: number, y: number): boolean {
    if (!this.grid || !this.gridComponent) return false;
    
    if (!this.gridComponent.isValidPosition(x, y)) return false;

    const key = this.gridComponent.getKey(x, y);
    if (this.gridComponent.units.has(key)) return false;

    const tile = this.grid.tileMap.getTile(x, y);
    if (!tile) return false;

    this.gridComponent.units.set(key, unit);
    tile.data.set('occupiedBy', unit);

    if (unit.has(GridPositionComponent)) {
      const gridPos = unit.get(GridPositionComponent);
      gridPos.setPosition(x, y);
    }

    return true;
  }

  public removeUnit(x: number, y: number): Entity | null {
    if (!this.grid || !this.gridComponent) return null;

    const key = this.gridComponent.getKey(x, y);
    const unit = this.gridComponent.units.get(key);
    if (!unit) return null;

    const tile = this.grid.tileMap.getTile(x, y);
    if (tile) {
      tile.data.delete('occupiedBy');
    }

    this.gridComponent.units.delete(key);
    return unit;
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
    if (!this.gridComponent) return true;
    const key = this.gridComponent.getKey(x, y);
    return this.gridComponent.units.has(key);
  }

  public getUnitAt(x: number, y: number): Entity | null {
    if (!this.gridComponent) return null;
    const key = this.gridComponent.getKey(x, y);
    return this.gridComponent.units.get(key) || null;
  }

  public getGridPosition(unit: Entity): { x: number, y: number } | null {
    if (!unit.has(GridPositionComponent)) return null;
    const gridPos = unit.get(GridPositionComponent);
    return { x: gridPos.x, y: gridPos.y };
  }

  public getWorldPosition(x: number, y: number): Vector | null {
    if (!this.grid) return null;
    const tile = this.grid.tileMap.getTile(x, y);
    return tile ? tile.center : null;
  }
}