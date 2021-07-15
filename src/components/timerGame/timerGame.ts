import './timerGame.scss';
import { BaseComponent } from '../../shared';
import { GAME_TIME } from '../../core';

export class TimerGame extends BaseComponent {
  public counter: { min: string; sec: string };

  public count: number;

  private timer: number | undefined = undefined;

  constructor() {
    super('div', ['timer-game']);
    this.count = 0;
    this.counter = { min: '00', sec: '00' };
    this.element.innerHTML = `
    <span>${this.counter.min} : ${this.counter.sec}</span>
    `;
  }

  startTimer(): void {
    this.count = 0;
    this.timer = window.setInterval(() => {
      this.count++;
      const sec = this.count % 60;
      const min = Math.trunc(this.count / 60);
      this.counter.min = min.toString().padStart(2, '0');
      this.counter.sec = sec.toString().padStart(2, '0');
      this.element.innerHTML = `<span>${this.counter.min} : ${this.counter.sec}</span>`;
      if (this.count === GAME_TIME) this.stopTimer();
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }

  clearTimer(): void {
    clearInterval(this.timer);
    this.counter = { min: '00', sec: '00' };
    this.element.innerHTML = `
    <span>${this.counter.min} : ${this.counter.sec}</span>
    `;
  }

  getCount(): number {
    return this.count;
  }

  render(): HTMLElement {
    return this.element;
  }
}
