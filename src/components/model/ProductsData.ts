import { Model } from "./Model";
import { IProduct, IProductsData } from "../../types";
import { IEvents } from "../base/Events";

export class ProductsData extends Model implements IProductsData {
  protected _products: IProduct[];

  constructor(events: IEvents) {
    super(events);
    this._products =[];
  }

  set products(value: IProduct[]) {
    this._products = value;
    this.events.emit('products:changed', this._products)
  }

  get products() {
    return this._products;
  }
   
  getProduct(id: string) {
    return this._products.find((product) => {
     return (product.id === id)
    })
  }
}