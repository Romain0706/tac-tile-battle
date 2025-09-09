import { Actor, Color, Vector } from 'excalibur';
import { TILE_SIZE, Z_LAYERS, COLORS } from '../../config/constants';
import { UnitComponent, Team, UnitClass } from '../../components/unit.component';
import { PositionComponent } from '../../components/position.component';
import { GridPositionComponent } from '../../components/grid-position.component';

export interface UnitConfig {
  x: number;
  y: number;
  team: Team;
  unitClass: UnitClass;
  name?: string;
}

export class UnitFactory {
  static createUnit(config: UnitConfig): Actor {
    const unit = new Actor({
      z: Z_LAYERS.UNIT,
      width: TILE_SIZE,
      height: TILE_SIZE,
      color: config.team === Team.PLAYER ? 
        Color.fromHex(COLORS.PLAYER_UNIT) : 
        Color.fromHex(COLORS.ENEMY_UNIT),
    });
    
    unit.addComponent(new UnitComponent(config.team, config.unitClass, config.name));
    unit.addComponent(new GridPositionComponent(config.x, config.y));
    unit.addComponent(new PositionComponent(new Vector(0, 0)));

    return unit;
  }
}