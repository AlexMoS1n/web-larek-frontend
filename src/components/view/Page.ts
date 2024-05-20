import { View } from "./View";
import { IPage, TPage } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Page extends View<TPage> implements IPage {
    protected _catalog: HTMLElement;
    protected buttonBasket: HTMLButtonElement;
    protected _counter: HTMLSpanElement;
    protected screen: HTMLDivElement;

 constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.buttonBasket = ensureElement<HTMLButtonElement>('.header__basket', container);
    this.buttonBasket.addEventListener('click', () => events.emit('modal-basket:open'));
    this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this.buttonBasket);
    this._catalog = ensureElement<HTMLElement>('.gallery', container);
    this.screen = ensureElement<HTMLDivElement>('.page__wrapper', container)
   }

   set catalog(cards: HTMLElement[]) {
      this._catalog.replaceChildren(...cards)
   }

   set counter(value: number) {
      this._counter.textContent = String(value);
   }

   lockScreen(value: boolean) {
      if(value) {this.screen.classList.add('page__wrapper_locked')}
      else{this.screen.classList.remove('page__wrapper_locked')}
   }
}