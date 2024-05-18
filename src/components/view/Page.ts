import { View } from "./View";
import { TPage } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Page extends View<TPage> {
    protected _catalog: HTMLElement;
    protected _counter: HTMLSpanElement;
    protected buttonBasket: HTMLButtonElement;

 constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.buttonBasket = ensureElement<HTMLButtonElement>('.header__basket', container);
    this.buttonBasket.addEventListener('click', () => events.emit('modal-basket:open'));
    this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this.buttonBasket);
    this._catalog = ensureElement<HTMLElement>('.gallery', container);
   }

   set catalog(cards: HTMLElement[]) {
      this._catalog.replaceChildren(...cards)
   }

   set counter(value: string) {
      this._counter.textContent = value;
   }
}