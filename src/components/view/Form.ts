import { View } from "./View";
import { IPage, TPage } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export class Form extends View<T> {
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
  }

  checkValidSubmit() {
    this.submitButton.disabled = this.inputsList.some(input => input.value.length === 0)
  }

  set errorMessage(value: string) {
    this._errorMessage.textContent = value  
  }

  clear() {
    this.container.reset()
  }
}