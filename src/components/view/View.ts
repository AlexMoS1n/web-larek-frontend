import { IEvents } from "../base/Events";

export abstract class View<T> {
  protected container: HTMLElement;
  protected events: IEvents;
  
  constructor(container: HTMLElement, events: IEvents) {
    this.container = container;
    this.events = events;
  }

  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}