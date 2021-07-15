import { BaseComponent } from './baseComponent';

export abstract class Content extends BaseComponent {
  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    super(tag, styles);
  }

  abstract init(): void;

  abstract reset(): void;

  abstract render(): HTMLElement;
}
