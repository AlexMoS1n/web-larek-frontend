import { View } from "./View";
import { TSuccess, ISuccess } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class Success extends View<TSuccess> implements ISuccess { 
  protected buttonOrderSuccess: HTMLButtonElement;
  protected _description: HTMLParagraphElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.buttonOrderSuccess = ensureElement<HTMLButtonElement>('.order-success__close', container);
    this._description = ensureElement<HTMLParagraphElement>('.order-success__description', container);
    this.buttonOrderSuccess.addEventListener('click', () => this.events.emit('success:confirm'))
  }

  set description(total: string) {
    this._description.textContent = `Списано ${total} синапсов`
  }
}