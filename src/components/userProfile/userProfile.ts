import './userProfile.scss';
import { ActionButton } from '../../shared';
import { STATES, Context, USER_ICON_DEF } from '../../core';

export class UserProfile extends ActionButton {
  private userIcon: HTMLImageElement;

  private btnWrapper: HTMLElement;

  private context: Context;

  constructor(image: string = USER_ICON_DEF) {
    super('ghjghjk', 'btn_start');
    this.element.textContent = 'Start Game';
    this.context = Context.getInstance();
    this.btnWrapper = document.createElement('li');
    this.userIcon = document.createElement('img');
    this.userIcon.classList.add('user__img');
    this.userIcon.src = image;
    this.element.addEventListener('click', () => {
      if (this.context.getActiveState() === STATES.game) {
        window.location.hash = STATES.about;
      } else {
        window.location.hash = STATES.game;
      }
    });
  }

  public buttonText(): void {
    if (this.element.classList.contains('active')) this.element.textContent = 'Stop Game';
    else this.element.textContent = 'Start Game';
  }

  public showUserProfile(url: string | undefined): void {
    if (url && url !== 'default') this.userIcon.src = url;
    this.btnWrapper.classList.add('show');
  }

  render(): HTMLElement {
    this.btnWrapper.classList.add('user');
    this.btnWrapper.append(this.element, this.userIcon);
    return this.btnWrapper;
  }
}
