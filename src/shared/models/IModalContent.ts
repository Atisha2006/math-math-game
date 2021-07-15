import { BaseComponent } from '../component';

export interface IModalContent extends BaseComponent {
  onClose(): void;
  render(): HTMLElement;
}
