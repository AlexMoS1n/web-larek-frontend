import { CardCatalog } from "./CardCatalog";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export class CardPreview<T> extends CardCatalog<T> {
  protected _description: HTMLParagraphElement;
  protected buttonBuyDelete: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._description = ensureElement<HTMLParagraphElement>('.card__image', container);
    this.buttonBuyDelete = ensureElement<HTMLButtonElement>('.card__button', container);
    this.buttonBuyDelete.addEventListener('click', () => {
      if(this.buttonBuyDelete.textContent === 'Купить') {this.events.emit('purchases:add', {id: this.id})}
      else {this.events.emit('purchases:delete', {id: this.id})}
    })
  }

  set priceCheck(value: boolean) {
    this.buttonBuyDelete.disabled = value
  }

  get priceCheck() { 
    return this.buttonBuyDelete.disabled 
  }

  set state(value: boolean) {
    if(this.priceCheck) { this.buttonBuyDelete.textContent = "Не продается"}
    else {
      if(value) {this.buttonBuyDelete.textContent = "Купить"} 
      else {this.buttonBuyDelete.textContent  = "Убрать из корзины"}
    }
  }
}
