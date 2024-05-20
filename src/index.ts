// делаем необходиме импорты для приложения
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from "./components/base/Events";
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppApi } from './components/AppApi';
import { ProductsData } from './components/model/ProductsData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';
import { CardCatalog } from './components/view/CardCatalog';
import { CardBasket } from './components/view/CardBasket';
import { CardPreview } from './components/view/CardPreview';
import { Page } from './components/view/Page';
import { Basket } from './components/view/Basket';
import { Modal } from './components/view/Modal';
import { FormOrder } from './components/view/FormOrder';
import { FormContacts } from './components/view/FormContacts';
import { Success } from './components/view/Success';
import { IProduct, TCardCatalog } from './types';

//найдем необходимые контейнеры и темплейты для классов представления
const containerPage = ensureElement<HTMLElement>('.page');
const containerModal = ensureElement<HTMLDivElement>('#modal-container');
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateOrder = ensureElement<HTMLTemplateElement>('#order');
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateSuccess = ensureElement<HTMLTemplateElement>('#success');

//Создаем необходимые экземпляры классов EventEmitter и AppApi
const appappi = new AppApi(CDN_URL, API_URL);
const events = new EventEmitter();

//Создаем необходимые экземпляры классов слоя модели
const productsData = new ProductsData(events);
const basketData = new BasketData(events);
const orderData = new OrderData(events);

//Создаем необходимые экземпляры классов слоя представления
const page = new Page(containerPage, events);
const modal = new Modal(containerModal, events);
const cardPreview = new CardPreview(cloneTemplate(templateCardPreview), events);
const basket = new Basket(cloneTemplate(templateBasket), events);
const formOrder = new FormOrder(cloneTemplate(templateOrder), events);
const formContacts = new FormContacts(cloneTemplate(templateContacts), events);
const success = new Success(cloneTemplate(templateSuccess), events);

//Обработаем события изменения данных 
//получение данных о продуктах с сервера
appappi.getProducts().then((data) => {
  productsData.products = data
})

//реагируем на изменение (получение) данных о продуктах 
events.on('products:changed', (products: IProduct[]) => {
  const cardsList = products.map((product) => {
    const card = new CardCatalog<TCardCatalog>(cloneTemplate(templateCardCatalog), events);
    return card.render(product)
 })
 page.render({catalog: cardsList})
});

//Прежде чем переходить к пользовательски событиям, обработаем поведение модального окна 
//обработаем событие открытия модального окна
events.on('modal:open', () => {
  page.lockScreen(true);
});

//обработаем событие закрытия модального окна
events.on('modal:close', () => {
  page.lockScreen(false);
});

//Далее идет обработка пользовательских событий 
//обработаем событие, когда покупатель кликнул по иконке(кнопке) корзины на главной старанице
events.on('modal-basket:open', () => {
  modal.render({ content: basket.render({total: basketData.getTotal(), emptyCheck: basketData.getQuantity() === 0})});
  modal.open();
});

//обработаем событие, когда покупатель кликнул по какой-нибудь карточке в каталоге на главной странице
events.on('modal-card:open',(data: {id: string}) => {
  const productCorrect = productsData.getProduct(data.id);
  if(productCorrect) { 
  modal.render({ content: cardPreview.render({...productCorrect, priceCheck: Boolean(productCorrect.price), state: basketData.checkProduct(productCorrect.id)})});
  modal.open();
  }
});

//обработаем событие добавления товара в корзину