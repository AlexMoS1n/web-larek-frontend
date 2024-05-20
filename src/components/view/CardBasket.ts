import { Card } from "./Card";
import { IEvents } from "../base/Events";
import { TCardBasket, ICardBasket } from '../../types/index';
import { ensureElement } from "../../utils/utils";

export class CardBasket extends Card<TCardBasket> implements ICardBasket {
  protected _index: HTMLSpanElement;
  protected buttonDelCard: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
    this.buttonDelCard = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
    this.buttonDelCard.addEventListener('click', () => this.events.emit('purchases:delete', {id: this.id}))
  }

  set index(value: number) {
    this._index.textContent = String(value)
  }
}