import { Model } from "./Model";
import { IOrderData, TPayment } from "../../types";
import { IEvents } from "../base/Events";


export class OrderData extends Model implements IOrderData {
  protected _payment: TPayment;
  protected _email: string;
  protected _phone: string;
  protected _address: string;
  protected _total: number;
  protected _items: string[];

  constructor(events: IEvents) {
    super(events);
  }

  set payment(value: TPayment) {
    this._payment = value
  }
  
  set email(value: string) {
    this._email = value
  }

  set phone(value: string) {
    this._phone = value
  }

  set address(value: string) {
    this._address = value
  }

  set total(value: number) {
    this._total = value
  }

  set items(value: string[]) {
    this._items = value
  }

  get customerInfo() {
    return {
      payment: this._payment,
			email: this._email,
			phone: this._phone,
			address: this._address,
			total: this._total,
			items: this._items
    }
  }
}