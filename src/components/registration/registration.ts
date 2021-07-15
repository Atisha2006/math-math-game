import './registration.scss';
import { BaseComponent, ActionButton, IUserConfig } from '../../shared';
import { Form, validator } from '../form';
import { Modal } from '../modal/modal';
import { Context, USER_ICON_DEF } from '../../core';
import { UserProfile } from '../userProfile/userProfile';

export class Registration extends BaseComponent {
  private registerButton: ActionButton;

  private form: Form;

  private modal: Modal;

  private userProfile: UserProfile;

  constructor(userProfile: UserProfile) {
    super('div', ['registration']);
    this.userProfile = userProfile;
    this.registerButton = new ActionButton('Register new player', 'btn_registration');
    this.form = new Form('Register new Player', validator);
    this.form.addInput('firstName', 'text');
    this.form.addInput('lastName', 'text');
    this.form.addInput('email', 'email');
    this.form.addImg(USER_ICON_DEF);
    this.form.addButton('Add User', this.addUser, 'btn_invert', 'disabled');
    this.form.addButton('Cancel', this.cancel);
    this.modal = new Modal(this.form);
    this.registerButton.element.addEventListener('click', () => {
      this.modal.showModal();
    });
  }

  private addUser = (val: IUserConfig): void => {
    this.modal.hideModal();
    this.hide();
    const context = Context.getInstance();
    context.setUser(val);
    this.userProfile.showUserProfile(val.icon);
  };

  private hide(): void {
    this.element.classList.add('hidden');
  }

  private cancel = (): void => {
    this.form.reset();
    this.modal.hideModal();
  };

  render(): HTMLElement {
    this.element.appendChild(this.registerButton.render());
    document.body.appendChild(this.modal.render());
    return this.element;
  }
}
