import { IEvents } from '../base/Events';

export abstract class Model {
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}
}
