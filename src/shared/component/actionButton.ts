import { BaseComponent } from './baseComponent';

export class ActionButton extends BaseComponent {
  private readonly text: string;

  private readonly buttonClass: string;

  isDisable: boolean;

  constructor(text: string, buttonClass = '') {
    const classArr = buttonClass === '' ? ['btn'] : ['btn', buttonClass];
    super('button', classArr);
    this.text = text;
    this.buttonClass = buttonClass;
    this.isDisable = false;
  }

  render(): HTMLElement {
    this.element.setAttribute('type', 'button');
    this.element.textContent = this.text;
    return this.element;
  }
}
