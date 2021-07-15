import { BaseComponent, NavButton } from '../../shared';
import { UserProfile } from '../userProfile/userProfile';

export class Navbar extends BaseComponent {
  private buttons: (NavButton | UserProfile)[] = [];

  constructor() {
    super('nav', ['navbar']);
  }

  append(button: NavButton | UserProfile): void {
    this.buttons = [...this.buttons, button];
    this.addActive();
  }

  addActive(): void {
    this.buttons.forEach((button) => {
      button.element.addEventListener('click', () => {
        if (button instanceof UserProfile && button.element.classList.contains('active')) {
          button.element.classList.remove('active');
          this.buttons[0].element.classList.add('active');
          button.buttonText();
        } else {
          this.buttons.forEach((el) => {
            el.element.classList.remove('active');
            if (el instanceof UserProfile) el.buttonText();
          });
          button.element.classList.add('active');
          if (button instanceof UserProfile) button.buttonText();
        }
      });
    });
  }

  render(): HTMLElement {
    const ulNav: HTMLElement = document.createElement('ul');
    ulNav.classList.add('nav');
    this.buttons.forEach((button) => ulNav.appendChild(button.render()));
    this.element.appendChild(ulNav);
    return this.element;
  }
}
