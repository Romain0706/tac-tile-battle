import { DisplayMode, Engine } from "excalibur";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./config/constants";
import { Battle } from "./scenes/battle.scene";

const game = new Engine({
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  displayMode: DisplayMode.FitScreen,
});

game.add('battle', new Battle())
game.start().then(() => {
  game.goToScene('battle');
});