import { Model } from "./base/Model";
import { IProduct, IProductsData } from "../types";
import { IEvents } from "./base/Events";

export class ProductsData extends Model implements IProductsData {
  protected _products: IProduct[];

  constructor(events: IEvents) {
    super(events);
  }

  set products(value: IProduct[]) {
    this._products = value;
    this.events.emit('products:changed')
  }

  get products() {
    return this._products;
  }
   
  getProduct(id: string):IProduct|undefined {
    return this._products.find(product => {
      (product.id === id)
    })
  }
}