export class Select {
  public element: HTMLSelectElement;

  private readonly text: string;

  private readonly title: string;

  private readonly options: string[];

  constructor(title: string, text: string, options: string[]) {
    this.element = document.createElement('select');
    this.element.classList.add('select');
    this.title = title;
    this.text = text;
    this.options = options;
  }

  clear(): void {
    this.element.innerHTML = '';
  }

  render(): HTMLElement {
    const selectWrapper = document.createElement('div');
    selectWrapper.classList.add('select__wraper');
    const titleSelect = document.createElement('h3');
    titleSelect.textContent = this.title;
    const optionTitle = document.createElement('option');
    optionTitle.textContent = this.text;
    optionTitle.setAttribute('selected', 'select');
    optionTitle.setAttribute('disabled', '');
    this.element.append(optionTitle);
    this.options.forEach((el) => {
      const option = document.createElement('option');
      option.textContent = el;
      option.setAttribute('value', el);
      this.element.append(option);
    });
    selectWrapper.append(titleSelect, this.element);
    return selectWrapper;
  }
}
