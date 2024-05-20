import { Model } from "./Model";
import { IBasketData, IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class BasketData extends Model implements IBasketData {
  protected _purchases: IProduct[];
  
  constructor(events: IEvents) {
    super(events);
    this._purchases = [];
  }

  get purchases() {
    return this._purchases
  }

  addPurchase(value: IProduct) {
    if(!this._purchases.find(purchase => {purchase.id === value.id})) {
      this._purchases.push(value);
      this.events.emit('purchases:changed', {id: value.id })
    }
  }

  deletePurchase(id: string) {
    this._purchases = this._purchases.filter(purchase => purchase.id !== id);
    this.events.emit('purchases:changed', {id})
  }

  getQuantity() {
    return this._purchases.length
  }

  checkProduct(id: string) {
    return Boolean(this._purchases.find(purchase => purchase.id === id))
  }


  getTotal() {
    return this._purchases.reduce((sum, purchase) => {
      return sum + purchase.price
    }, 0)
  }

  getIdList() {
    return this._purchases.map(purchase => {
      return purchase.id
    })
  }

  clear() {
    this._purchases = [];
    this.events.emit('purchases:changed', {})
  }
}