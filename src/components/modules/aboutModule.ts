import { AboutBlock } from '../aboutBlock';
import { Content } from '../../shared';

export class AboutModule extends Content {
  private title: HTMLElement;

  constructor() {
    super('div', ['content']);
    this.title = document.createElement('h2');
  }

  init(): void {
    this.title.textContent = 'How to play?';
    this.element.append(this.title);
  }

  reset(): void {
    this.element.innerHTML = '';
  }

  render(): HTMLElement {
    const block1 = new AboutBlock(1, 'Register new player in game', './images/form.jpg');
    const block2 = new AboutBlock(2, 'Configure your game settings', './images/button.jpg');
    const block3 = new AboutBlock(3, 'Start you game! Remember card position and match it.', './images/game.jpg');
    this.title.textContent = 'How to play?';
    this.element.append(block1.render(), block2.render(), block3.render());
    return this.element;
  }
}
