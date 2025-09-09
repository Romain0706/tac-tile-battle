import { Engine, Scene, EventEmitter } from "excalibur";
import { GridEntity } from "../entities/grid.entity";
import { Team, UnitClass } from "../components/unit.component";
import { GRID_ROWS } from "../config/constants";
import { GridSystem } from "../systems/grid.system";
import { UnitSpawningSystem } from "../systems/unit-spawning.system";
import { GridEvents, SpawnUnitEvent } from "../events/grid.events";
import { GameEvents } from "../interfaces/scene-with-events.interface";

export class Battle extends Scene {
    private _gridEntity: GridEntity;
    private _gridSystem: GridSystem;
    private _unitSpawningSystem: UnitSpawningSystem;
    public events = new EventEmitter<GameEvents>();

    constructor() {
        super();

        // Single unified grid entity
        this._gridEntity = new GridEntity();
        this.add(this._gridEntity);
        
        // Add systems
        this._unitSpawningSystem = new UnitSpawningSystem(this.world);
        this.world.add(this._unitSpawningSystem);
        
        this._gridSystem = new GridSystem(this.world);
        this.world.add(this._gridSystem);
    }
    
    public onInitialize(_engine: Engine): void {
        this.spawnInitialUnits();
    }

    private spawnInitialUnits(): void {
        const playerUnits = [
            { x: 1, y: GRID_ROWS - 2, unitClass: UnitClass.SWORD, name: "Hero" },
            { x: 2, y: GRID_ROWS - 1, unitClass: UnitClass.BOW, name: "Archer" },
            { x: 3, y: GRID_ROWS - 1, unitClass: UnitClass.MAGE, name: "Mage" },
        ];

        const enemyUnits = [
            { x: 2, y: 1, unitClass: UnitClass.SWORD, name: "Orc" },
            { x: 3, y: 2, unitClass: UnitClass.SPEAR, name: "Goblin" },
        ];

        playerUnits.forEach(config => {
            this.events.emit(GridEvents.SpawnUnit, new SpawnUnitEvent(
                config.x,
                config.y,
                Team.PLAYER,
                config.unitClass,
                config.name
            ));
        });

        enemyUnits.forEach(config => {
            this.events.emit(GridEvents.SpawnUnit, new SpawnUnitEvent(
                config.x,
                config.y,
                Team.ENEMY,
                config.unitClass,
                config.name
            ));
        });
    }
}