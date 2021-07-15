import { AboutModule, GameModule, ScoreModule, SettingsModule, Header } from './components';
import { Router, STATES } from './core';
import { Content } from './shared';

export class App {
  private readonly application: HTMLElement;

  private header: Header;

  private aboutModule: Content;

  private gameModule: Content;

  private settingsModule: Content;

  private scoreModule: Content;

  private router: Router;

  private routeStates = new Map<string, Content>();

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();

    this.application = document.createElement('main');
    this.application.classList.add('main');

    this.aboutModule = new AboutModule();
    this.scoreModule = new ScoreModule();
    this.settingsModule = new SettingsModule();
    this.gameModule = new GameModule();

    this.routeStates.set(STATES.about, this.aboutModule);
    this.routeStates.set(STATES.game, this.gameModule);
    this.routeStates.set(STATES.score, this.scoreModule);
    this.routeStates.set(STATES.settings, this.settingsModule);

    this.router = new Router(this.application, this.routeStates);
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.header.render());
    this.rootElement.appendChild(this.application);
    return this.rootElement;
  }
}
