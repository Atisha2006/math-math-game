import { BaseComponent, delay } from '../../shared';
import { Card } from '../card/card';
import { CardsField } from '../cardsField/cardsField';
import { TimerGame } from '../timerGame/timerGame';
import { Context, FLIP_DELAY, RANDOM_INDEX, START_TIMER_DELAY, STATES } from '../../core';

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private cards: Card[] = [];

  private timerGame: TimerGame;

  private activeCard: Card = undefined!;

  private isAnimation = false;

  private move: number;

  private context: Context;

  private dalayTimer: number | undefined = undefined;

  constructor() {
    super('div', ['game']);
    this.context = Context.getInstance();
    this.cardsField = new CardsField();
    this.timerGame = new TimerGame();
    this.move = 0;
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    const length = this.context.getDifficulty()[1];
    images.length = length;
    this.cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - RANDOM_INDEX);

    this.cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
    });

    this.cardsField.addCards(this.cards);
    this.dalayTimer = window.setTimeout(() => {
      this.cardsField.flipAllCard();
      this.timerGame.startTimer();
    }, START_TIMER_DELAY);
  }

  resetGame(): void {
    clearInterval(this.dalayTimer);
    this.timerGame.clearTimer();
    this.element.innerHTML = '';
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation || !card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.addCardClass(card, 'error-match');
      await delay(FLIP_DELAY);
      this.removeCardClass(card, 'error-match');
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.move--;
    } else {
      this.addCardClass(card, 'match');
      this.move++;
      if (this.cards.every((el) => !el.isFlipped)) {
        this.timerGame.stopTimer();
        this.victory();
      }
    }

    this.activeCard = undefined!;
    this.isAnimation = false;
  }

  private scoreGame() {
    const score = this.move * 100 - this.timerGame.getCount() * 10; //  scoring formula
    return score > 0 ? score : 0;
  }

  private addCardClass(card: Card, cardClass: string): void {
    card.element.classList.add(cardClass);
    this.activeCard.element.classList.add(cardClass);
  }

  private removeCardClass(card: Card, cardClass: string): void {
    card.element.classList.remove(cardClass);
    this.activeCard.element.classList.remove(cardClass);
  }

  private victory(): void {
    this.timerGame.stopTimer();
    const score = this.scoreGame();
    const context = Context.getInstance();
    context.setScore(score);
    alert(`Congratulations! \nYou successfully found all matches. \nYour score: ${score}`);
    window.location.hash = STATES.score;
    const btnStart = document.querySelector('.btn_start');
    if (btnStart) {
      btnStart.classList.remove('active');
      btnStart.textContent = 'Start Game';
    }
  }

  render(): HTMLElement {
    this.element.appendChild(this.timerGame.render());
    this.cardsField.element.classList.remove('easy', 'hard', 'medium');
    this.cardsField.element.classList.add(this.context.getDifficulty()[0]);
    this.element.appendChild(this.cardsField.render());
    return this.element;
  }
}
