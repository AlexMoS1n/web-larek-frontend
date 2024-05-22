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
- `readonly baseUrl: string` - базовый url для api
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
- `_events: Map<EventName, Set<Subscriber>>` - хранит события в виде Map, где ключом является строка или регулярное выражение, а значением сет коллбэков.

Методы, геттеры и сеттеры:
- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - подписка на событие
- `off(eventName: EventName, callback: Subscriber)` - отписка от события
- `emit<T extends object>(eventName: string, data?: T)` - инициализация события
- `onAll(callback: (event: EmitterEvent) => void)` - подписаться на все события (выполнить коллбек на любое событие)
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
Расширяет класс Model. Класс отвечает за хранение и логику работы с данными товаров.

Поля:
- `protected _products: IProduct[]` - массив объектов товаров.

Параметры в конструкторе:
- параметры `Model`. 

Методы, геттеры и сеттеры:
- `set products(value: IProduct[]): void` - записывает массив продуктов, добавленных в корзину
- `get products(): IProduct[]` - возвращает массив продуктов, добавленных в корзину
- `getProduct(id: string): IProduct` - находит товар по id и возвращает его.

#### Класс BasketData
Расширяет класс Model. Класс отвечает за хранение и логику товаров, добавленных покупателем в корзину

Поля:
- `protected _purchases: IProduct[]` - массив добавленных товаров в корзине покупателя.

Параметры в конструкторе:
- параметры `Model`. 

Методы, геттеры и сеттеры:
- `get purchases(): IProduct[]` - получить массив добавленных товаров в корзину (_purchases)
- `addPurchase(value: IProduct): void` - добавить товар в массив _purchases
- `deletePurchase(id: string): void` - удалить товар из массива _purchases
- `getQuantity(): number` - получить общее количество добавленных товаров в корзину
- `checkProduct(id: string)` - определяет по id, есть ли данный товар уже в корзине
- `getTotal(): number` - получить общую сумму всех товаров, добавленных в корзину
- `getIdList(): string[]` - получить список id товаров добавленных в корзину (нужен для post запроса при оформлении заказа)
- `clear(): void` - очистка корзины (нужна после успешно оформленного заказа).

#### Класс OrderData
Класс отвечает за хранение и логику данных при оформлении заказа в корзине.  

Поля:
- `protected _payment: TPayment` - способ оплаты
- `protected _email: string` - email покупателя
- `protected _phone: string` - номер телефона покупателя
- `protected _address: string` - адрес покупателя
- `protected _total: number` - общая стоимость заказанных товаров
- `protected _items: string[]` - список id товаров заказа
  
Параметры в конструкторе:
- параметры `-`
  
Методы, геттеры и сеттеры:
 - `set payment(value: TPayment): void` - запись способа оплаты 
 - `set email(value: string): void` - запись email покупателя
 - `set phone(value: string): void` - запись номера телефона покупателя
 - `set address(value: string): void` - запись адреса покупателя
 - `set total(value: number): void` - запись общей суммы покупок
 - `set items(value: string[])`  - запись id товаров заказа
 - `get customerInfo(): ICustomer` - возвращение всей информации о заказе в формате необходимом для отправки в теле post запроса на сервер. 

#### Класс OrderDataBuilder
Расширяет класс Model. Класс является билдером класса OrderData. Т.к. формирование заказа происходит в 3 этапа (1 - добавление товаров в корзину, 2 - указание способа покупки и адреса доставки, 3 - указание email и телефона), то экземпляр класса OrderData также создается поэтапно, благодаря классу OrderDataBuilder.
Поля:
`protected order: IOrderData` - экземпляр интерфейса IOrderData (такой же как экземпляр класс OrderData)

Параметры в конструкторе:
- параметры `Model`
- `orderConstructor: IOrderConstructor` - класс, создающий объекты интерфейса IOrderData.

Методы, геттеры и сеттеры:
- `set purchasesInfo: TPurchasesInfo` - запись информации с корзины (1 этап)
- `set deliveryInfo: TDeliveryInfo` - запись информации с формы доставки (2 этап)
- `set contactsInfo: TContactsInfo` - запись информации с формы контактной информации (3 этап)
- `getOrderData(): ICustomer` - возвращение готового результата.

#### Класс SuccessData
Расширяет класс Model. Класс отвечает за данные, получаемые с сервера после успешного оформления заказа

Поля:
- `protected _orderSuccess: TSuccessData` - данные об успешном заказе, поступающие с сервера.

Параметры в конструкторе:
- параметры `Model`.

Методы, геттеры и сеттеры:
`set orderSuccess (value: TSuccessData): void` - запись данных оформленного заказа, поступающие с сервера.

### Слой представления - View

#### Класс View
Абстрактный класс View является дженериком и служит шаблоном для классов слоя представления

Поля:
- `protected _container: HTMLElement` - DOM элемент, передаваемый в конструкторе
- `protected events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

Параметры в конструкторе:
- `container: HTMLElement` - DOM элемент компонента
- `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

Методы, геттеры и сеттеры:
- `render(data?: Partial<T>): HTMLElement` - возвращает отрисованный html элемент по переданным данным

#### Класс Card  
Расширяет класс View. Является абстрактным классом, имеющий общие поля у трех разновидностей карточек в приложении: карточка в каталоге на главной странице (CardCatalog), карточка подробного описания товара в модальном окне (CardDetail) и карточка товара в корзине (CardBasket).  

Поля:
- `protected _id: string` - id карточки товара
- `protected _title: HTMLHeadingElement` - html элемент, отвечающий за отображение имени товара
- `protected _price: HTMLSpanElement` - html элемент, отвечающий за отображение цены товара.

Параметры в конструкторе:
- параметры `View`.

Методы, геттеры и сеттеры:
- `set id(value: string): void` - запись id карточки товара
- `get id(): string`  - получение id карточки товара 
- `set title(value: string): void` - запись имени карточки товара
- `get title(): string` - получение имени карточки товара
- `set price(value: string): void` - запись цены товара
- `get price(): string` - получение цены товара.

#### Класс CardCatalog 
Расширяет класс Card, также является классом дженериком. Служит для отображения карточки в каталоге на главной странице приложения. 

Поля:
- `protected _image: HTMLImageElement` - html элемент, отвечающий за отображение изображения товара
- `protected _category: HTMLSpanElement` - html элемент, отвечающий за отображение категории товара.

Параметры в конструкторе:
- параметры `Card`.

Методы, геттеры и сеттеры:
- `protected addCSSClassCategory(value: string): void` - служебный метод, предназначенный для присваивания определенного css класса html элементу категории товара в зависимости от ее названия (установка фонового цвета) 
- `set image(src: string): void` - запись данных изображения товара
- `set category(value: string): void` - запись данных категории товара
- `get category(): string` - получение названия категории товара. 

#### Класс CardBasket 
Расширяет класс Card. Служит для отображения карточки товара в корзине.

Поля:
- `_index: HTMLSpanElement` - html элемент, отвечающий за отображение порядкового номера в корзине
- `buttonDelCard: HTMLButtonElement` - иконка корзины, по клику на которую удаляется соответствующая карточка.

Параметры в конструкторе:
- параметры класса `Card`. 

Методы, геттеры и сеттеры:
- `set index(value: number): void` - записывает порядковый номер карточки в корзине.

#### Класс CardPreview
Расширяет класс CardCatalog. Служит для предварительного просмотра карточки товара с более детальным описанием и возможностью добавления его в корзину.

Поля:
- `protected _description: HTMLParagraphElement` - html элемент, отвечающий за отображение описания товара
- `protected buttonBuyDelete: HTMLButtonElement` - кнопка для покупки товара или удаления товара из корзины в случае, если он уже был добавлен в нее. 

Параметры в конструкторе:
- параметры класса `CardCatalog`. 

Методы, геттеры и сеттеры:
- `set description(value: string): void` - записвает описание товара
- `set priceCheck(value: boolean): void` - записывает булево значение для блокировки/разблокировки кнопки добавления в корзину, если в модальном окне открыт бесценный товар: true - блокирует кнопку, false - разблокирует кнопку
- `get priceCheck(): boolean` - возвращает булево значение для блокировки/разблокировки кнопки добавления в корзину
- `set state(value: boolean)` - устанавливает состояние кнопки: 
  1. в модальном окне открыт бесценный товар - кнопка заблокирована и ей присвоена надпись "Не продается"
  2. в модальном окне открыт товар, который уже находится в корзине - кнопка работает на удаление данного товара из корзины и ей присвоена надпись "Убрать из корзины"
  3. в модальном окне открыт товар, которого нет в корзине - кнопка работает на добавление данного товара в корзину и ей присвоена надпись "Купить".  

#### Класс Page
Расширяет класс View. За основной контейнер берет главную страницу приложения. Служит для отображения корзины в шапке сайта и показа количества добавленного товара в ней, также данный класс служит за отображение блока с карточками товаров.

Поля:
- `protected _catalog: HTMLElement` - контейнер для отображения карточек товаров
- `protected buttonBasket: HTMLButtonElement` - иконка(кнопка), по нажатию на которую открывается модальное окно с корзиной
- `protected _counter: HTMLSpanElement` - html элемент, показывающий количество добавленных товаров в корзину
- `protected screen: HTMLDivElement` - html элемент, отвечающий за внутренннее содержимое страницы(экран).

Параметры в конструкторе:
- параметры класса `View`. 

Методы, геттеры и сеттеры:
- `set catalog(cards: HTMLElement[]): void` - записывает карточки в _catalog для отображения их на главной странице
- `set counter(value: string): void` - записывает количество добавленных товаров в корзину
- `lockScreen(value: boolean): void` - данный метод служит для блокировки/разблокировки экрана(окна), чтоб не было его прокрутки при открытии/закрытии модального окна.

#### Класс Basket
Расширяет класс View. Отображает корзину с добавленными в нее товарами.

Поля
- `protected _cardsList: HTMLUListElement` - html элемент, отвечающий за отображение списка карточек в корзине
- `protected _totalPrice: HTMLSpanElement;` - html элемент, отвечающий за отображение общей стоимости товаров
- `protected buttonСheckout: HTMLButtonElement` - кнопка "Оформить".

Параметры в конструкторе:
- параметры класса `View`.

Методы, геттеры и сеттеры:
- `set cardsList(cards: HTMLElement[]): void` - устанавливает список карточек добавленных товаров в корзину
- `set emptyCheck(state: boolean): void` - для блокировки кнопки "Оформить", если корзина пуста
- `set total(value: number)` - устанавливает общую стоимость товаров в html элемент _totalPrice.
 
#### Класс Modal
 Расширяет класс View. Реализует модальное окно. Устанавливает слушатели на клик в оверлей и кнопку-крестик для закрытия попапа.  

Поля:
- `protected _content: HTMLElement` - содержимое модального окна
- `protected buttonClose: HTMLButtonElement` - кнопка закрытия модального окна.

Параметры в конструкторе:
- параметры `View`.

Методы, геттеры и сеттеры:
- `set content(value: HTMLElement): void` - для возможности изменения внутреннего содержимого модального окна
- `open(): void` - метод отображения модального окна
- `close(): void` - метод для закрытия модального окна.

#### Класс Form
Расширяет класс View. Является абстрактным классом дженериком и шаблоном для форм приложения. Реализует пользовательский функционал с формами.  

Поля:
- `protected container: HTMLFormElement` - соответствующая форма
- `protected inputsList: HTMLInputElement[]` - массив input элементов формы
- `protected submitButton: HTMLButtonElement` - кнопка отправки формы
- `protected _errorMessage: HTMLSpanElement` - html элемент для отображения ошибок формы.

Параметры в конструкторе:
- параметры `View`.
  
Методы, геттеры и сеттеры:
- `get valid(): boolean` - получения статуса валидности формы
- `set valid(value: boolean):void` - запись для блокировки (true) / разблокировки (false) кнопки submit
- `set errorMessage(value: string)` - установка текста ошибок
- `clear():void` - очистка формы
- `render(data: Partial<T> & TForm ): HTMLElement` -  модернизированный render View для форм: учитывает установку обязательных полей valid и errorMessage.  

#### Класс FormOrder
Расширяет класс Form. Форма для указания способа доставки и адреса доставки.

Поля:
- `protected containerButtons: HTMLDivElement` - контейнер, содержащий кнопки "онлайн" и "при получении"
- `protected buttonCard: HTMLButtonElement` - кнопка "онлайн"
- `protected buttonCash: HTMLButtonElement` - кнопка "при получении"
- `protected inputAddress: HTMLInputElement` - поле для ввода адреса покупателя.

Параметры в конструкторе:
- параметры `Form`.
 
Методы, геттеры и сеттеры:
- `protected getButtonActive(): HTMLButtonElement | null` - служебный метод: возвращает кнопку, которая активна, либо null, если никто из них неактивна
- `protected resetButtons(): void` - служебный метод: очищает класс активности с кнопок "Онлайн" и "При получении"
- `clear(): void` - Очищает форму (в том числе снимает класс активности с кнопок)
- `get payment(): TPayment | null` - возвращает имя активной кнопки (нужно для записи способа покупки), либо null
- `get address(): string` -  возвращает адрес покупателя
- `get valid(): boolean` - возвращает валидность формы. В данном случае форма валидна, если была нажата одна из кнопок и в поле ввода не пустое значение. Также записывается текст ошибки
- `set valid(value: boolean):void` - запись для блокировки (true) / разблокировки (false) кнопки submit.
  
#### Класс FormContacts
Расширяет класс Form. Форма для указания телефона и email покупателя.

Поля
- `protected inputEmail: HTMLInputElement` - текстовое поле для email
- `protected inputPhone: HTMLInputElement` - текстовое поле для номера телефона.

Параметры в конструкторе:
- параметры `Form`.

Методы, геттеры и сеттеры:
- `get email(): string` - возвращает email из поля ввода email
- `get phone(): string` - возвращает номер телефона из поля ввода phone
- `get valid(): boolean` - возвращает валидность формы. В данном случае форма валидна, если все поля заполнены. Также записывается текст ошибки 
- `set valid(value: boolean):void` - запись для блокировки (true) / разблокировки (false) кнопки submit. 

#### Класс Success
Наследует класс View. Уведомление об успешной покупке, содержит кнопку "за новыми покупками!".

Поля
- `protected buttonOrderSuccess: HTMLButtonElement` - кнопка "За новыми покупками"
- `protected _description: HTMLParagraphElement` - html элемент, отвечающий за показ потраченных средств за все покупки.

Параметры в конструкторе:
- параметры `View`

Методы, геттеры и сеттеры:
- `set description(total: string): void` - устанавливает количество потраченных средств в html элемент _description.

### Слой коммуникации

#### Класс AppApi
Расширяет класс Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

Поля
- `protected cdn: string` - базовый путь до изображений карточек, передаваемый в конструкторе. 

Параметры в конструкторе:
- параметры `Api`
- `cdn: string` - базовый путь до изображений карточек.

Методы, геттеры и сеттеры:
- `getProducts(): Promise<IProduct[]>` - получает с сервера массив объектов всех товаров
- `getProductById(id: string): Promise<IProduct>` - получает с сервера конкретный товар по id
- `postOrder(order: ICustomer): Promise<TSuccessData> ` - отправляет post запрос на сервер, содержащий данные о заказе и получает по итогу номер заказа (id) и общую сумму заказ (total).

## Взаимодействие компонентов - слой Presenter
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.  
Взаимодействие осуществляется за счет событий, генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.  

### *Список событий, которые могут генерироваться в системе:*

#### *События изменения данных (генерируются классами моделями данных):*

- `products:changed` - изменение массива данных продуктов
- `purchases:changed` - изменение массива покупок(добавленные товары покупателем в корзину)
- `success:changed` - событие, возникающее при получении(изменении) данных успешного заказа.

#### *События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление):*

- `modal:open` - событие, срабатывающее при открытии модального окна
- `modal:close` - событие, срабатывающее при закрытии модального окна
- `modal-card:open` - выбор карточки для отображения в модальном окне
- `modal-basket:open` - открытие модального окна для отображения корзины
- `purchases:add` - событие при добавлении товара в покупки покупателя
- `purchases:delete` - событие при удалении товара из покупок покупателя
- `modal-order:open` - открытие модального окна с формой доставки
- `order:valid` - событие, возникающее при действиях покупателя с полями формы доставки 
- `order:submit` - событие, возникающее при успешном прохождении формы доставки
- `contacts:valid` - событие, возникающее при действиях покупателя с полями формы контактных данных
- `contacts:submit` - событие, возникающее при успешном прохождении формы контактных данных.