import { BaseComponent } from './baseComponent';

export class Input extends BaseComponent {
  name: string;

  type: string;

  label: HTMLLabelElement;

  input: HTMLInputElement;

  error: HTMLElement;

  onInput = (): void => {};

  constructor(name: string, type: string) {
    super('div', ['input__wrapper']);
    this.name = name;
    this.type = type;

    this.label = document.createElement('label');
    this.label.classList.add('form__label');
    this.label.setAttribute('for', this.name);
    this.label.textContent = this.name;

    this.input = document.createElement('input');
    this.input.classList.add('form__input');
    this.input.setAttribute('type', this.type);
    this.input.setAttribute('name', this.name);

    this.error = document.createElement('div');
    this.error.classList.add('form__error');

    this.input.addEventListener('input', () => {
      this.onInput();
    });
  }

  getValue(): string {
    return this.input.value;
  }

  clear(): void {
    this.input.value = '';
    this.error.textContent = '';
    this.input.classList.remove('valid');
    this.input.classList.remove('invalid');
  }

  setError(error: string | null): void {
    if (error === null) {
      this.error.textContent = '';
      this.input.classList.remove('invalid');
      this.input.classList.add('valid');
    } else {
      this.error.textContent = error;
      if (this.getValue().length === 0) {
        this.input.classList.remove('valid');
        this.input.classList.remove('invalid');
      } else {
        this.input.classList.add('invalid');
        this.input.classList.remove('valid');
      }
    }
  }

  render(): HTMLElement {
    this.element.append(this.label, this.input, this.error);
    return this.element;
  }
}
