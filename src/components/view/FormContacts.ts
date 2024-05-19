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
}