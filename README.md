# Проектная работа "Веб-ларек"

## Выполнение итогового задания к 9 спринту Мосиным Александром Сегеевичем :flushed:

[Ссылка на репозиторий](https://github.com/AlexMoS1n/web-larek-frontend.git)


Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP: 
- Model - слой данных, отвечает за хранение и изменение данных
- View - слой представления, отвечает за отображение данных на странице, 
- Presenter - презентер, отвечает за связь представления и данных.

### UML схема

![MVP Архитектура приложения](https://github.com/AlexMoS1n/web-larek-frontend/blob/main/README-UML.png)

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов. 

Поля:  
- `readonly  baseUrl: string` - базовый url для api
- `protected options: RequestInit` - объект с настройками для формирования запроса.
  
Параметры в конструкторе:  
- `baseUrl: string` - базовый url для api
- `options: RequestInit` - объект с настройками для формирования запроса.
  
Методы: 
- `protected handleResponse(response: Response): Promise<object>` - обрабатывает ответа с сервера. Если ответ с сервера пришел, то возвращается его в формате json, в противном случае формирует ошибку
- `get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  

Поля:
- `_events: Map<EventName, Set<Subscriber>>` - хранит события в виде Map, где ключём является строка или регулярное выражение, а значением сет коллбэков.

Методы, геттеры и сеттеры:
- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - подписка на событие
- `off(eventName: EventName, callback: Subscriber)` - отписка от события
- `emit<T extends object>(eventName: string, data?: T)` - инициализация события
- `onAll(callback: (event: EmitterEvent) => void)` - подписаться на все события (выполнить колбек на любое событие)
- `offAll()` - для сброса событий
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.   

### Слой данных - Model

#### Класс Model 
Абстрактный класс Model служит шаблоном для классов слоя данных 
Поля:
- `protected events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

Параметры в конструкторе:
- `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

#### Класс ProductsData
Наследуется от класса Model. Класс отвечает за хранение и логику работы с данными товаров.

Поля:
- `protected _products: IProduct[]` - массив объектов товаров.

Параметры в конструкторе:
- параметры `Model`. 

Методы, геттеры и сеттеры:
- `set products(value: IProduct[]): void` - записывает массив продуктов, добавленных в корзину
- `get products(): IProduct[]` - возвращает массив продуктов, добавленных в корзину
- `getProduct(id: string): IProduct` - находит товар по id и возвращает его.

#### Класс BasketData
Наследуется от класса Model. Класс отвечает за хранение и логику товаров, добавленных покупателем в корзину

Поля:
- `protected _purchases: IProduct[]` - массив добавленных товаров в корзине покупателя.

Параметры в конструкторе:
- параметры `Model`. 

Методы, геттеры и сеттеры:
- `get purchases(): IProduct[]` - получить массив добавленных товаров в корзину (_purchases)
- `addPurchase(value: IProduct): void` - добавить товар в массив _purchases
- `deletePurchase(id: string): void` - удалить товар из массива _purchases
- `getQuantity(): number` - получить общее количество добавленных товаров в корзину
- `getTotal(): number` - получить общую сумму всех товаров, добавленных в корзину
- `getIdList(): string[]` - получить список id товаров добавленных в корзину (нужен для post запроса при оформлении заказа)
- `clear(): void` - очистка корзины (нужна после успешно оформленного заказа).

#### Класс OrderData
Наследут класс Model. Класс отвечает за хранение и логику данных при оформлении заказа в корзине.  

Поля:
- `protected _payment: TPayment` - способ оплаты
- `protected _email: string` - email покупателя
- `protected _phone: string` - номер телефона покупателя
- `protected _address: string` - адрес покупателя
- `protected _total: number` - общая стоимость заказанных товаров
- `protected _items: string[]` - список id товаров заказа
  
Параметры в конструкторе:
- параметры `Model`.
  
Методы, геттеры и сеттеры:
 - `set payment(value: TPayment): void` - запись способа оплаты 
 - `set email(value: string): void` - запись email покупателя
 - `set phone(value: string): void` - запись номера телефона покупателя
 - `set address(value: string): void` - запись адреса покупателя
 - `set total(value: number): void` - запись общей суммы покупок
 - `set items(value: string[])`  - запись id товаров заказа
 - `get customerInfo(): ICustomer` - возвращение всей информации о заказе в формате необходимом для отправки в теле post запроса на сервер. 

#### Класс SuccessData
Класс отвечает за данные, получаемые с сервера после успешного офрмления заказа

Поля:
- `protected _id: string` - id заказа
- `protected _total: number` - общая сумма покупки
- `protected events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

Параметры в конструкторе:
- `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

Методы, геттеры и сеттеры:
- `set id(value: string): void` - запись id заказа
- `set total(value: number): void` - запись общей суммы заказа.

### Слой представления - View

#### Класс View
Абстрактный класс View служит шаблоном для классов слоя представления

Поля:
- `protected _container: HTMLElement` - DOM элемент, передаваемый в конструкторе
- `protected events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

Параметры в конструкторе:
- `container: HTMLElement` - DOM элемент компонента
- `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

Методы, геттеры и сеттеры:
- `render(data?: Partial<T>): HTMLElement` - возвращает отрисовнный html элемент по переданным данным

#### Класс BasketHeader
Наследует класс View. Реализует корзину, расположенную в header страницы: показывает количество добавленного товара и открывает при нажатии полноценное модальное окно с подробной корзиной товаров.   

Поля:
- `protected _counter: HTMLSpanElement` - счётчик количества товаров в корзине.

Параметры в конструкторе:
- параметры `View`.

Методы, геттеры и сеттеры:
- `set counter(value: number): void` - устанавливает значение в счётчике товаров корзины.
  
#### Класс Modal
Наследует класс View. Реализует модальное окно. Так же предоставляет методы `open` и `close` для управления отображением модального окна. Устанавливает слушатели на клик в оверлей и кнопку-крестик для закрытия попапа.  

Поля:
- `protected closeButton: HTMLButtonElement` - кнопка закрытия модального окна.

Параметры в конструкторе:
- параметры `View`.

Методы, геттеры и сеттеры:
- `set content(value: HTMLElement): void` - нужен для возможности изменения внутреннего содержимого модального окна
- `open(): void` - отображает модальное окно
- `close(): void` - скрывает модальное окно.

#### Класс Form
Наследует класс View. Реализует пользовательский функционал с формами.  

Поля:
- `protected inputList: HTMLInputElement[]` - список input элементов формы
- `protected submitButton: HTMLButtonElement` - кнопка отправки формы
- `protected _error: HTMLSpanElement` - элемент для отображения ошибок формы.

Параметры в конструкторе:
- параметры `View`.
  
Методы, геттеры и сеттеры:
- `get valid(): boolean` - получения статуса валидности формы
- `set valid(value: boolean):void` - для блокировки / разблокировки кнопки submit
- `set textError(value: string)` - установка текста ошибок
- `clear():void` - очистка формы.

#### Класс Card  
Наследует класс View. Отвечает за отображение карточки с товаром, задавая в карточке данные товара: название, изображение, категорию, описание и цену. Класс используется для отображения карточек на странице сайта. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов верстки. 

Поля:
- `protected _id: string` - id карточки товара
- `protected _title: HTMLHeadingElement` - html элемент, отвечающий за отображение имени товара
- `protected _image: HTMLImageElement` - html элемент, отвечающий за отображение изображение товара
- `protected _category: HTMLSpanElement` - html элемент, отвечающий за отображение категории товара
- `protected _price: HTMLSpanElement` - html элемент, отвечающий за отображение цены товара

Параметры в конструкторе:
- параметры `View`

Методы, геттеры и сеттеры:
- `set card(cardData: TCard): void` - заполняет атрибуты элементов карточки данными

#### Класс CardsCatalog
Наследует класс View. Отвечает за отображение блока с карточками на главной странице.

Поля:
- `protected classCard: ICardConstructor` - класс для создания карточки товара

Параметры в конструкторе:
- `classCard: ICardConstructor` - класс для создания карточки товара

Методы, геттеры и сеттеры:
- `addCard(cardsList: TCard[]): void` - метод для добавления карточек.

#### Класс CardPreview
Расширяет класс Card. Служит для предварительного просмотра карточки товара с более детальным описанием и возможностью добавления его в корзину.

Поля:
- `protected _description: HTMLParagraphElement` - html элемент, отвечающий за отображение описание товара
- `protected buttonBuy: HTMLButtonElement` - кнопка для покупки товара. 

Параметры в конструкторе:
- параметры класса `Card`. 

Методы, геттеры и сеттеры:
- `set card(cardData: ICard): void` - заполняет атрибуты элементов карточки данными 
- `get card(): HTMLElement` - метод возвращает полностью заполненную карточку.
- `get valid(): boolean` - возвращает булево значение для блокировки/разблокировки кнопки добавления в корзину: false - если в карточке отображается бесценный товар и кнопка заблокирована, в обратном случае - true и кнопка разблокирована.
- `set valid(state: boolean): void` - устанавливает валидность ui элемента, отключая кнопку. В данном случае кнопка отключается если в модальном окне открыт бесценный товар.

#### Класс CardBasket 
Расширяет класс Card. Служит для отображения карточки товара в корзине.

Поля:
- `buttonDelCard: HTMLButtonElement` - иконка корзины по клику, на которую удаляется соответствующая карточка.

Параметры в конструкторе:
- параметры класса `Card`. 

Методы, геттеры и сеттеры:
- `set card(cardData: TCardBasket): void` - заполняет атрибуты элементов карточки данными
- `get card(): HTMLElement` - метод возвращает полностью заполненную карточку.

#### Класс BasketView
Наследует класс View. Отображает корзину с добавленными в нее товарами.

Поля
- `protected _list: HTMLElement` - html элемент, отвечающий за отображение списка карточек
- `protected _totalPrice: HTMLSpanElement;` - html элемент, отвечающий за отображение общей стоимости товаров
- `protected buttonConfirmOrder: HTMLButtonElement` - кнопка "оформить"
- `protected classCard: ICardBasketConstructor` - класс для создания карточки товара в корзине

Параметры в конструкторе:
- `protected classCard: ICardConstructor` - класс для создания карточки товара в корзине

Методы, геттеры и сеттеры:
- `set list(items: ICardBasket[]): void` - для установки карточек товаров в корзине
- `set valid(state: boolean)` - для блокировки, если корзина пуста
- `set totalPrice(value: number)` - устанавливает общую стоимость товаров в html элемент _price.
  
#### Класс OrderForm
Расширяет класс Form. Форма для указания способа доставки и адреса доставки.

Поля:
- `protected buttonContainer: HTMLDivElement` - контейнер, содержащий кнопки "онлайн" и "при получении"
- `protected buttonOnline: HTMLButtonElement;` - кнопка "онлайн"
- `protected buttonPoint: HTMLButtonElement` - кнопка "при получении"
- `protected inputAddress: HTMLInputElement` - поле для ввода адреса.

Параметры в конструкторе:
- параметры `Form`
 
Методы, геттеры и сеттеры:
- `protected getActiveButton(): HTMLButtonElement | null` - возвращает кнопку, которая активна, либо null, если никто из них неактивна.
- `protected toggleOnlinePoint(state: boolean): void` - добавляет или удаляет класс, символизирующий активность, c кнопки "Онлайн"/"При получении".
- `protected resetButtons(): void` - очищаетет класс активности с кнопок "Онлайн" и "При получении".
- `clear(): void` - Очищает форму (в том числе снимает класс активности с кнопок)
- `get valid(): boolean` - возвращает валидность формы. В данном случае форма валидна, если была нажата одна из кнопок и в поле ввода не пустое значение.
- `set valid(value: boolean)` - устанавливает валидность формы, блокируя кнопку. В данном случае форма валидна, если была нажата одна из кнопок и в поле ввода не пустое значение.

#### Класс ContactsForm
Расширяет класс Form. Форма для указания телефона и email покупателя.

Поля
- `protected emailInput: HTMLInputElement` - текстовое поле для email
- `protected phoneInput: HTMLInputElement` - текстовое поле для номера телефона.

Параметры в конструкторе:
- параметры `Form`

Методы, геттеры и сеттеры:
- `get email(): string` - возвращает email из поля ввода email
- `get phone(): string` - возвращает номер телефона из поля ввода phone

#### Класс Success
Наследует класс View. Уведомление об успешной покупке, содержит кнопку "за новыми покупками!".

Поля
- `protected button: HTMLButtonElement;` - кнопка "за новыми покупками"
- `protected messageTotalSum: HTMLParagraphElement` - html элемент, отвечающий за показ потраченных средств за все покупки.

Параметры в конструкторе:
- параметры `View`

Методы, геттеры и сеттеры:
- `set total(value: TSuccess)` - устанавливает количество потраченных средств в html элемент messageTotalSum.

### Слой коммуникации

#### Класс AppApi
Наследуется от класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.  

Методы, геттеры и сеттеры:
- `getProducts(): Promise<IProduct[]>` - получает с сервера массив объектов всех товаров
- `getProductById(id: string): Promise<IProduct>` - получает с сервера конкретный товар по id
- `postOrder(order: ICustomer): Promise<IOrderSuccessfulData> ` - отправляет post запрос на сервер, содержащий данные о заказе и получает по итогу номер заказа (id) и общую сумму заказ (total).

## Взаимодействие компонентов - слой Presenter
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.  
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.  

### *Список событий, которые могут генерироваться в системе:*

#### *События изменения данных (генерируются классами моделями данных):*

- `products:changed` - изменение массива данных продуктов
- `purchases:changed` - изменение массива покупок(добавленные товары покупателем в корзину)
- `product:selected` -изменение открываемой в модальном окне карточки товара
- `success:changed` - изменение данных заказа

#### *События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление):*

- `purchases:add` - событие при добавлении товара в покупки покупателя
- `purchases:delete` - событие при удалении товара в покупки покупателя
- `modal-card:open` - выбор карточки для отображения в модальном окне
- `modal-basket:open` - открытие модального окна для отображения корзины
- `modal-order:open` - открытие модального окна с формой доставки
- `modal-contacts:open` - открытие модального окна с формой контактов покупателя
- `modal-success:open` - открытие модального окна успешно оформленного заказа
- `edit-order:input` - изменение данных в форме доставки
- `edit-contacts:inputs` - изменение данных в форме контактов покупателя
- `basket:submit` - сохранение данных о выбранных покупателем товаров
- `edit-order:submit` - сохранение способа оплаты и адреса доставки пользователя
- `edit-contacts:submit` - сохранение email и телефона покупателя
- `success: submit` - очистка данных данных о пользователь поссле подтверждения успешного заказа
- `edit-order:validation` - событие, сообщающее о необходимости валидации формы доставки
- `edit-contacts:validation` - событие, сообщающее о необходимости валидации формы контактных данных покупателя