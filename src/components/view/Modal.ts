import { View } from "./View";
import { IModal, TModal } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Modal extends View<TModal> implements IModal {
  protected _content: HTMLElement;
  protected buttonClose: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.container.addEventListener('click', (event) => {
      if(event.target === event.currentTarget) {this.close()}
    });
    this._content = ensureElement<HTMLElement>('.modal__container', container);
    this.buttonClose = ensureElement<HTMLButtonElement>('.modal__close', this._content);
    this.buttonClose.addEventListener('click', () => this.close())
  }

  open() {
    this.container.classList.add('modal_active')
    this.events.emit('modal:open')
  }

  close() {
    this.container.classList.remove('modal_active')
    this.events.emit('modal:close')
  }

  set content(value: HTMLElement){
    this._content.replaceChildren(value);
  }
}