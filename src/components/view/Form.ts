import { View } from "./View";
import { IForm, TForm } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export abstract class Form<T> extends View<TForm> implements IForm {
  protected container: HTMLFormElement;
  protected inputsList: HTMLInputElement[];
  protected submitButton: HTMLButtonElement;
  protected _errorMessage: HTMLSpanElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this.inputsList = ensureAllElements<HTMLInputElement>('.form__input', container);
    this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);
    this._errorMessage = ensureElement<HTMLSpanElement>('.form__errors' , container);

    this.container.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit(`${this.container.name}:submit`)
    })
    this.inputsList.forEach(input => {
      input.addEventListener('input', () => 
        this.events.emit(`${this.container.name}:valid`))
    });
  }

  get valid() {
    return this.inputsList.every(input => input.value.length === 0)
  }

  set valid(value: boolean) {
    this.submitButton.disabled = value;
  }

  set errorMessage(value: string) {
    this._errorMessage.textContent = value  
  }

  clear() {
    this.container.reset()
  }

  render(data: Partial<T> & TForm ): HTMLElement {
    const {valid, ...otherFormData} = data;
    this.valid = valid;
    return super.render(otherFormData)
  }
}