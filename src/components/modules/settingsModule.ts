import { Context } from '../../core';
import { Select, Content } from '../../shared';

export class SettingsModule extends Content {
  private title: HTMLElement;

  private selectCard: Select;

  private selectDifficulty: Select;

  private context: Context;

  constructor() {
    super('div', ['content']);
    this.context = Context.getInstance();
    this.title = document.createElement('h2');
    this.selectCard = new Select('Game cards', 'select game card type', ['animal', 'santaniel']);
    this.selectCard.element.addEventListener('change', () => {
      this.context.setCategory(this.selectCard.element.value);
    });
    this.selectDifficulty = new Select('Difficulty', 'select game type', ['easy', 'medium', 'hard']);
    this.selectDifficulty.element.addEventListener('change', () => {
      this.context.setDifficulty(this.selectDifficulty.element.value);
    });
  }

  init(): void {
    this.title.textContent = 'Settings';
    this.element.append(this.title);
  }

  reset(): void {
    this.element.innerHTML = '';
    this.selectCard.clear();
    this.selectDifficulty.clear();
  }

  render(): HTMLElement {
    this.element.append(this.selectCard.render(), this.selectDifficulty.render());
    return this.element;
  }
}
