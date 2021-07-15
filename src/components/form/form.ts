import './form.scss';
import { BaseComponent, ActionButton, Input, IModalContent, IUserConfig } from '../../shared';
import { USER_ICON_DEF, VALIDATE_DELAY } from '../../core';
import { Validator } from './validator';

export interface ImyObj {
  [key: string]: string;
}

export class Form extends BaseComponent implements IModalContent {
  private inputs: Input[];

  private buttons: ActionButton[];

  private isValid: boolean;

  private title: string;

  private validate: Validator;

  private addIcon: boolean;

  private formImgWrap: HTMLElement;

  private userIcon: HTMLImageElement;

  constructor(title: string, onValidate: Validator) {
    super('form', ['form']);
    this.inputs = [];
    this.buttons = [];
    this.validate = onValidate;
    this.isValid = false;
    this.title = title;
    this.formImgWrap = undefined!;
    this.addIcon = false;
    this.userIcon = undefined!;
  }

  getObject(): ImyObj {
    const result: ImyObj = {};
    this.inputs.forEach((elem) => {
      result[elem.name] = elem.input.value;
    });
    return result;
  }

  addInput(name: string, type: string): void {
    const newInput: Input = new Input(name, type);
    let timeoutId: NodeJS.Timeout;
    newInput.onInput = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        this.setErrors(this.validate(this.getObject()));
      }, VALIDATE_DELAY);
    };
    this.inputs = [...this.inputs, newInput];
  }

  addImg(image: string): void {
    this.formImgWrap = document.createElement('div');
    this.formImgWrap.classList.add('form__img-wrapper');

    this.userIcon = document.createElement('img');
    this.userIcon.classList.add('form__user-img');
    this.userIcon.src = image;

    const input = document.createElement('input');
    input.classList.add('user__input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', 'upload');

    this.formImgWrap.append(this.userIcon, /* canvas, */ input);

    input.addEventListener('change', () => {
      if (!input.files) return;

      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.userIcon.src = reader.result;
          this.addIcon = true;
        }
      };
      reader.readAsDataURL(file);
      input.value = '';

    });
  }

  addButton(text: string, callback: (val: IUserConfig) => void, buttonClass?: string, disableState?: string): void {
    const newButton: ActionButton = new ActionButton(text, buttonClass);
    if (disableState) newButton.isDisable = true;
    newButton.element.addEventListener('click', () => {
      if (newButton.isDisable && !this.element.classList.contains('valid')) {
        this.setErrors(this.validate(this.getObject()));
      } else {
        const userData = this.getObject();
        userData.score = '0';
        if (!this.addIcon) userData.icon = 'default';
        else userData.icon = this.userIcon.src;
        callback(userData as unknown as IUserConfig);
      }
    });
    this.buttons = [...this.buttons, newButton];
  }

  setErrors(resValidate: Map<string, string | null>): void {
    resValidate.forEach((value, key) => {
      const input = this.inputs.find((el) => el.name === key);
      if (input) {
        input.setError(value);
      }
    });

    this.isValid = [...resValidate.values()].every((value) => {
      return !value;
    });

    if (!this.isValid) {
      this.element.classList.remove('valid');
    } else {
      this.element.classList.add('valid');
    }
  }

  reset(): void {
    this.element.classList.remove('valid');
    this.userIcon.src = USER_ICON_DEF;
    this.inputs.forEach((elem) => {
      elem.clear();
    });
  }

  onClose(): void {
    this.reset();
  }

  render(): HTMLElement {
    const formTitle = document.createElement('h3');
    formTitle.classList.add('form__title');
    formTitle.textContent = this.title;

    const formInner = document.createElement('div');
    formInner.classList.add('form__inner');
    this.inputs.forEach((elem) => {
      formInner.append(elem.render());
    });

    const buttonWrap = document.createElement('div');
    buttonWrap.classList.add('button__field');
    this.buttons.forEach((elem) => {
      buttonWrap.append(elem.render());
    });

    this.element.append(formTitle, formInner, this.formImgWrap, buttonWrap);
    return this.element;
  }
}
