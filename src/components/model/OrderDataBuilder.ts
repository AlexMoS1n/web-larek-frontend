import { Model } from "./Model";
import { IEvents } from "../base/Events";
import { IOrderDataBuilder , IOrderConstructor, IOrderData, TPurchasesInfo, TDeliveryInfo, TContactsInfo } from "../../types";

export class OrderDataBuilder extends Model implements IOrderDataBuilder {
  protected order: IOrderData;

  constructor(events: IEvents, orderConstructor: IOrderConstructor) {
		super(events);
    this.order = new orderConstructor();
	}

  set purchasesInfo(info: TPurchasesInfo) {
    this.order.total = info.total;
    this.order.items = info.items
  }

  set deliveryInfo(info: TDeliveryInfo) {
    this.order.payment = info.payment;
    this.order.address = info.address 
  }

  set contactsInfo(info: TContactsInfo) {
    this.order.email = info.email;
    this.order.phone = info.phone;
  }

  getOrderData() {
    return this.order
  }
}