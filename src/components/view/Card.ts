import { ICard } from "../../types";
import { IEvents } from "../base/Events";
import { View } from "./View";
import { ensureElement } from "../../utils/utils";

export abstract class Card<T> extends View<T> implements ICard {
  protected _id: string;
  protected _title: HTMLHeadingElement;
  protected _price: HTMLSpanElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', container);
  }

  set id(value: string) {
    this._id = value
  }

  get id() {
    return this._id
  }

  set title(value: string) {
    this._title.textContent = value
  }

  get title() {
    return this._title.textContent ?? ''
  }

  set price(value: string) {
    this._price.textContent = value ? `${value} синапсов` : `Бесценно`
  }

  get price() {
    return this._price.textContent ?? ''
  }
}