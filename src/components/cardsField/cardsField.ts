import './cardsField.scss';
import { BaseComponent } from '../../shared';
import { Card } from '../card/card';

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
  }

  flipAllCard(): void {
    this.cards.forEach((card) => card.flipToBack());
  }

  render(): HTMLElement {
    return this.element;
  }
}
