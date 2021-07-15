import { Content } from '../shared';
import { Context } from './context';

export class Router {
  private routes: Map<string, Content>;

  private parentNode: HTMLElement;

  private context: Context;

  constructor(parentNode: HTMLElement, routes: Map<string, Content>) {
    this.routes = routes;
    this.parentNode = parentNode;
    this.context = Context.getInstance();

    const defModule = this.routes.get(this.context.getActiveState());

    if (defModule) {
      defModule.init();
      this.parentNode?.appendChild(defModule.render());
    }

    window.onpopstate = () => {
      const activeState = this.routes.get(this.context.getActiveState());
      if (activeState) activeState.reset();

      if (this.parentNode) this.parentNode.innerHTML = '';
      const currentRouteName = window.location.hash.slice(1);
      const module = this.routes.get(currentRouteName);
      this.context.setActiveState(currentRouteName);
      if (module) {
        module.init();
        this.parentNode?.appendChild(module.render());
      }
    };
  }
}
