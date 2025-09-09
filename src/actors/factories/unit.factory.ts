import { Actor, Tile, Color } from 'excalibur';
import { 
  Team, 
  TILE_SIZE,
  Z_LAYERS,
  COLORS
} from '../../config/constants';

export interface UnitConfig {
  tile: Tile;
  team: Team;
}

export class UnitFactory {
  static createUnit(config: UnitConfig): Actor {
    const unit = new Actor({
      pos: config.tile.center,
      z: Z_LAYERS.UNIT,
      width: TILE_SIZE,
      height: TILE_SIZE,
      color: config.team === Team.PLAYER ? 
        Color.fromHex(COLORS.PLAYER_UNIT) : 
        Color.fromHex(COLORS.ENEMY_UNIT),
    });
    
    this.setupUnitEvents(unit);

    return unit;
  }

  private static setupUnitEvents(unit: Actor): void {
    unit.on('pointerdragstart', () => {
      console.log('drag start');
    });

    unit.on('pointerdragmove', (evt) => {
      console.log('drag move');
    });

    unit.on('pointerdragend', (evt) => {
      console.log('drag end');
    });
  }
}