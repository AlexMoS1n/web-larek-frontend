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
  checkProduct(id: string): boolean;
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

export interface ISuccessData {
  id: string;
  total: number;
}

export interface IAppApi {
  getProducts(): Promise<IProduct[]>;
  getProductById(id: string): Promise<IProduct>;
  postOrder(order: ICustomer): Promise<ISuccessData>;
}

export interface ICard {
  id: string;
  title: string;
  price: string;
}

export interface ICardCatalog {
  image: string;
  category: string;
}

export interface ICardBasket {
  index: number;
}

export interface ICardPreview {
  description: string;
  priceCheck: boolean;
  state: boolean;
}

export interface IPage {
  catalog: HTMLElement[];
  counter: number;
  lockScreen(value: boolean): void;
}

export interface IBasket {
  cardsList: HTMLElement[];
  emptyCheck: boolean;
  total: number
}

export interface IModal {
  content: HTMLElement;
  open(): void;
  close(): void;
}

export interface IForm {
  valid: boolean;
  errorMessage: string;
  clear(): void;
}

export interface IFormOrder {
  payment: TPayment | null;
  address: string;
  valid: boolean;
  clear(): void; 
  render(data: object ): HTMLElement; 
}

export interface IFormContacts {
  email: string;
  phone: string;
}

export interface ISuccess {
  description: number;
}

export interface ICardConstructor {
  new (container: HTMLElement, events: IEvents): ICard;
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

export type TCardCatalog = Omit<IProduct, 'description'>;
export type TCategoryClassNames = 'card__category_soft' |'card__category_other' | 'card__category_additional' | 'card__category_button' | 'card__category_hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;
export type TCardBasket = Pick<IProduct, 'id' | 'title' | 'price'> & {index: number};
export type TCardPreview = IProduct & {priceCheck: boolean; state: boolean};
export type TPage = {counter: number, catalog: HTMLElement[]};
export type TBasket = {cardsList: HTMLElement[]; total: number; emptyCheck: boolean};
export type TModal ={content: HTMLElement};
export type TForm = {valid: boolean; errorMessage: string}
export type TPayment = 'card' | 'cash';
export type TFormOrder = {payment: TPayment; address: string};
export type TFormContacts = {email: string; phone: string};
export type TSuccess = {description: string};

