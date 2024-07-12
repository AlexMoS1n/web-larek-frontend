import { Form } from "./Form";
import { IFormContacts, TFormContacts } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class FormContacts extends Form<TFormContacts> implements IFormContacts {
  protected inputEmail: HTMLInputElement;
  protected inputPhone: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events); 
    this.inputEmail = ensureElement<HTMLInputElement>('input[name=email]', container);
    this.inputPhone = ensureElement<HTMLInputElement>('input[name=phone]', container);
  }

  get email() {
    return this.inputEmail.value;
  }

  get phone() {
    return this.inputPhone.value
  }

  get valid() {
    const isInputEmail = Boolean(this.inputEmail.value);
    const isInputPhone = Boolean(this.inputPhone.value);
    if(isInputEmail && isInputPhone) {
      this.errorMessage ='';
      return false
    }
    else if(super.valid) {
      this.errorMessage ='Заполните поля эл. почты и телефона';
      return true
    }
    else if(!isInputEmail && isInputPhone) {
      this.errorMessage ='Заполните поле эл. почты';
      return true
    }
    else if(isInputEmail && !isInputPhone) {
      this.errorMessage ='Заполните поле телефона';
      return true
    }
  }

  set valid(value: boolean) {
    super.valid = value;
  }


}