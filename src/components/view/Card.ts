import { ICard } from "../../types";
import { IEvents } from "../base/Events";
import { View } from "./View";
import { ensureElement } from "../../utils/utils";

export class Card<T> extends View<T> {
  protected _id: string;
  protected _title: HTMLHeadingElement;
  protected _price: HTMLSpanElement;

  constructor(container: HTMLElement, events: IEvents){
    super(container, events)
    this._title = ensureElement<HTMLHeadingElement>('.card__title')
    this._price = ensureElement<HTMLSpanElement>('.card__price')
  }

  set id(value: string) {
    this._id = value
  }
}