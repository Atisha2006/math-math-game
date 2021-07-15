import './modal.scss';
import { BaseComponent, IModalContent } from '../../shared';

export class Modal extends BaseComponent {
  private content: IModalContent;

  private modalContent: HTMLElement;

  constructor(content: IModalContent) {
    super('div', ['overlay', 'hidden']);
    this.content = content;
    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('modal-content', 'hidden');

    this.element.addEventListener('click', () => {
      this.hideModal();
      this.content.onClose();
    });
  }

  showModal(): void {
    this.element.classList.remove('hidden');
    this.modalContent.classList.remove('hidden');
  }

  hideModal(): void {
    this.element.classList.add('hidden');
    this.modalContent.classList.add('hidden');
  }

  render(): HTMLElement {
    this.modalContent.append(this.content.render());
    document.body.append(this.modalContent);
    return this.element;
  }
}
