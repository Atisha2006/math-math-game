import './scoreModule.scss';
import { Context } from '../../core';
import { Content } from '../../shared';

export class ScoreModule extends Content {
  private title: HTMLElement;

  private context: Context;

  constructor() {
    super('div', ['content']);
    this.title = document.createElement('h2');
    this.context = Context.getInstance();
  }

  init(): void {
    this.title.textContent = 'Best players';
    this.element.append(this.title);
    this.context.writeTop(this.element);
  }

  reset(): void {
    this.element.innerHTML = '';
  }

  render(): HTMLElement {
    return this.element;
  }
}
