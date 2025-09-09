import { System, SystemType, World, Scene } from "excalibur";
import { UnitFactory } from "../actors/factories/unit.factory";
import { GridEvents, SpawnUnitEvent, UnitCreatedEvent } from "../events/grid.events";
import { SceneWithGridEvents } from "../interfaces/scene-with-events.interface";

export class UnitSpawningSystem extends System {
  public systemType = SystemType.Update;
  public priority = -10; // Run before GridSystem

  private scene?: SceneWithGridEvents;

  constructor(world: World) {
    super();
  }

  public initialize(world: World, scene: Scene): void {
    this.scene = scene as SceneWithGridEvents;
    
    // Listen to spawn unit events
    this.scene.events.on(GridEvents.SpawnUnit, this.handleSpawnUnit.bind(this));
  }

  public update(delta: number): void {
    // No per-frame updates needed
  }

  private handleSpawnUnit(event: SpawnUnitEvent): void {
    try {
      const unit = UnitFactory.createUnit({
        x: event.x,
        y: event.y,
        team: event.team,
        unitClass: event.unitClass,
        name: event.name
      });

      if (this.scene) {
        this.scene.add(unit);
        
        // Emit unit created event for other systems
        this.scene.events.emit(GridEvents.UnitCreated, 
          new UnitCreatedEvent(unit, event.x, event.y));
      }
    } catch (error) {
      console.error(`Failed to spawn unit at (${event.x}, ${event.y}):`, error);
    }
  }
}