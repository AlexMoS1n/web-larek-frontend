import { IEvents } from "../components/base/Events";

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
  getProduct(id: string): IProduct|undefined;
}

export interface IBasketData {
  purchases: IProduct[];
  addPurchase(value: IProduct): void;
  deletePurchase(id: string): void;
  getQuantity(): number;
  getTotal(): number;
  getIdList(): string[];
  clear(): void;
}

export interface ICustomer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IOrderData extends ICustomer {
  customerInfo: ICustomer;
}

export interface IAppApi {
  getProducts(): Promise<IProduct[]>;
  getProductById(id: string): Promise<IProduct>;
  postOrder(order: ICustomer): Promise<IOrderSuccessfulData>;
}

export interface IOrderSuccessfulData {
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
export type TSuccess = Pick<IOrderSuccessfulData, 'total'>

