import { Form } from "./Form";
import { TFormOrder, TPayment, IFormOrder } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class FormOrder extends Form<TFormOrder> implements IFormOrder {
  protected containerButtons: HTMLDivElement;
  protected buttonCard: HTMLButtonElement;
  protected buttonCash: HTMLButtonElement;
  protected inputAddress: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events); 
    this.containerButtons = ensureElement<HTMLDivElement>('.order__buttons', container);
    this.buttonCard = ensureElement<HTMLButtonElement>('button[name="card"]', this.containerButtons);
    this.buttonCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.containerButtons);
    this.inputAddress = ensureElement<HTMLInputElement>('input[name=address]', container);
    this.containerButtons.addEventListener('click', (event) => {
      if((event.target === this.buttonCard) || (event.target === this.buttonCash)) {
        const buttonActive = event.target as HTMLButtonElement;
        this.resetButtons();
        buttonActive.classList.add('button_alt-active');
        this.events.emit('order:valid')
      }
    })
  }

  protected getButtonActive(): HTMLButtonElement | null {
    if(this.buttonCard.classList.contains('button_alt-active')) {return this.buttonCard}
    else if(this.buttonCash.classList.contains('button_alt-active')) {return this.buttonCash}
    return null;
  }

  protected resetButtons(): void {
    this.buttonCard.classList.remove('button_alt-active');
    this.buttonCash.classList.remove('button_alt-active');
  }

  clear(){
    super.clear();
    this.resetButtons()
  }

  get payment() {
    const buttonActive = this.getButtonActive();
    return buttonActive ? buttonActive.name as TPayment : null; 
  }

  get address() {
    return this.inputAddress.value
  }

  get valid() {
    if(!(super.valid) && Boolean(this.payment)) {
      this.errorMessage ='';
      return false
    }
    else if ((super.valid) && Boolean(this.payment)) {
      this.errorMessage = 'Заполните поле адреса';
      return true
    }
    else if ((super.valid) && !Boolean(this.payment)) {
      this.errorMessage = 'Выберите способ оплаты и заполните поле адреса';
      return true
    }
    this.errorMessage = 'Выберите способ оплаты';
    return true
  }

  set valid(value: boolean) {
    super.valid = value;
  }
}