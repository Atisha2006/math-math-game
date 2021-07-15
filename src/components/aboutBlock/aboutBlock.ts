import './aboutBlock.scss';
import { BaseComponent } from '../../shared';

export class AboutBlock extends BaseComponent {
  private count: string;

  private text: string;

  private image: string;

  constructor(count: number, text: string, image: string) {
    super('div', ['about__row']);
    this.count = String(count);
    this.text = text;
    this.image = image;
  }

  render(): HTMLElement {
    const textWrap = document.createElement('div');
    textWrap.classList.add('about__text-wrapper');

    const count = document.createElement('div');
    count.classList.add('about__text-count');
    count.textContent = this.count;

    const text = document.createElement('div');
    text.classList.add('about__text');
    text.textContent = this.text;

    const img = document.createElement('img');
    img.classList.add('about__img');
    img.src = this.image;

    textWrap.append(count, text);
    this.element.append(textWrap, img);
    return this.element;
  }
}
