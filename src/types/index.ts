import { IEvents } from "../components/base/events";

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IProductsData {
  products: IProduct[];
  addProduct(product: IProduct): void;
  getProduct(productId: string): IProduct;
}

export interface ICustomer {
  payment: TPayment;
  address: string;
  email: string;
  phone: string;
  purchases: IProduct[];
  totalSum: number;
}

export interface IOrderData extends ICustomer {
  customerInfo: ICustomer;
  addCard(item: IProduct): void;
  deleteCard(id: string): void;
  }

export interface ISuccessData {
  id: string;
  total: number;
}

export interface IBasketHeader {
  counter: number;
}

export interface IModal {
  content: HTMLElement;
  open(): void;
  close(): void;
}

export interface IForm {
  valid: boolean;
  textError: string;
  clear(): void;
}

export interface ICard {
  card: HTMLElement;
}

export interface ICardConstructor {
  new (container: HTMLElement, events: IEvents): ICard;
}

export interface ICardsCatalog {
  addCard(cardsList: TCard[]): void;
}

export interface ICardBasket {
  card: HTMLElement;
}

export interface ICardBasketConstructor {
  new (container: HTMLElement, events: IEvents): ICardBasket;
}

export interface IBasketView {
  list: ICardBasket[];
  valid: boolean;
  totalPrice: number;
}

export interface Success {
  total: number;
}

export type TPayment = 'online' | 'point';
export type TCard = Omit<IProduct, 'description'>;
export type TCardBasket = Pick<IProduct, 'title'|'price'>;
export type TSuccess = Pick<ISuccessData, 'total'>
