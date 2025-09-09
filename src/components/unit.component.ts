import { Component } from "excalibur";

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

export class UnitComponent extends Component {
  constructor(
    public team: Team,
    public unitClass: UnitClass,
    public name: string = "Unit"
  ) {
    super();
  }
}