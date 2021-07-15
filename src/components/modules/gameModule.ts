import { IImageCategory, Content } from '../../shared';
import { Context } from '../../core';
import { Game } from '../game';

export class GameModule extends Content {
  private readonly game: Game;

  private context: Context;

  constructor() {
    super('div', ['content']);
    this.context = Context.getInstance();
    this.game = new Game();
  }

  async init(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: IImageCategory[] = await res.json();
    const cat = categories[this.context.getCategory()];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }

  reset(): void {
    this.element.innerHTML = '';
    this.game.resetGame();
  }

  render(): HTMLElement {
    this.element.appendChild(this.game.render());
    return this.element;
  }
}
