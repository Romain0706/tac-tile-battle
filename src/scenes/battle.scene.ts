import { Actor, Engine, Scene } from "excalibur";
import { Grid } from "../actors/grid.actor";
import { GridComponent } from "../components/grid.component";
import { UnitFactory } from "../actors/factories/unit.factory";
import { Team, UnitClass } from "../components/unit.component";
import { GRID_COLS, GRID_ROWS } from "../config/constants";
import { GridSystem } from "../systems/grid.system";

export class Battle extends Scene {
    private _grid: Grid;
    private _gridComponent: GridComponent;
    private _gridEntity: Actor;
    private _gridSystem: GridSystem;

    constructor() {
        super();

        this._grid = new Grid();
        this.add(this._grid);
        
        this._gridComponent = new GridComponent(GRID_COLS, GRID_ROWS);
        this._gridEntity = new Actor();
        this._gridEntity.addComponent(this._gridComponent);
        this.add(this._gridEntity);
        
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
            const unit = UnitFactory.createUnit({
                ...config,
                team: Team.PLAYER
            });
            this.spawnUnit(unit, config.x, config.y);
        });

        enemyUnits.forEach(config => {
            const unit = UnitFactory.createUnit({
                ...config,
                team: Team.ENEMY
            });
            this.spawnUnit(unit, config.x, config.y);
        });
    }

    private spawnUnit(unit: Actor, x: number, y: number): void {
        if (this._gridSystem.placeUnit(unit, x, y)) {
            this.add(unit);
        }
    }
}