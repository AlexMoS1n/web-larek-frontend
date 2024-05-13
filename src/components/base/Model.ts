import { IEvents } from "./events";

export abstract class Model {
  protected events: IEvents;

  constructor (events: IEvents) {
    this.events = events;
  }
}