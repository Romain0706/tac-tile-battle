export const SCREEN_WIDTH = 720;
export const SCREEN_HEIGHT = 1280;

export const GRID_COLS = 6;
export const GRID_ROWS = 8;
export const TILE_SIZE = (SCREEN_WIDTH - 18) / GRID_COLS;
export const GRID_WIDTH = GRID_COLS * TILE_SIZE;
export const GRID_HEIGHT = GRID_ROWS * TILE_SIZE;
export const GRID_OFFSET_X = (SCREEN_WIDTH - GRID_WIDTH) / 2;
export const GRID_OFFSET_Y = (SCREEN_HEIGHT - GRID_HEIGHT) - 9;

export enum UnitClass {
  SWORD = 'sword',
  SPEAR = 'spear',
  BOW = 'bow',
  MAGE = 'mage',
  HEALER = 'healer'
}

export enum Team {
  PLAYER = 'player',
  ENEMY = 'enemy'
}

export const COLORS = {
  TILE_ODD: '#eeeed2',
  TILE_EVEN: '#baca44',
  PLAYER_UNIT: '#4169e1',
  ENEMY_UNIT: '#dc143c'
};

export const Z_LAYERS = {
  BACKGROUND: 0,
  GRID: 1,
  UNIT: 10,
  EFFECTS: 20,
  UI: 100,
  DRAGGING_UNIT: 1000,
};