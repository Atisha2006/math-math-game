import './header.scss';
import { BaseComponent, NavButton } from '../../shared';
import { Navbar } from '../navbar/navbar';
import { Registration } from '../registration/registration';
import { UserProfile } from '../userProfile/userProfile';

export class Header extends BaseComponent {
  private navbar: Navbar;

  private registration: Registration;

  private userProfile: UserProfile;

  constructor() {
    super('header', ['header']);
    this.navbar = new Navbar();
    this.navbar.append(new NavButton('About game', 'question.svg', 'page-about', 'active'));
    this.navbar.append(new NavButton('Best Score', 'star.svg', 'page-score'));
    this.navbar.append(new NavButton('Game Settings', 'gear.svg', 'page-settings'));
    this.userProfile = new UserProfile();
    this.registration = new Registration(this.userProfile);
    this.navbar.append(this.userProfile);
  }

  render(): HTMLElement {
    const logo: HTMLElement = document.createElement('div');
    logo.classList.add('logo');
    logo.innerHTML = `<span>Match</span><span>Match</span>`;
    this.element.appendChild(logo);

    this.element.appendChild(this.navbar.render());
    this.element.appendChild(this.registration.render());
    return this.element;
  }
}
