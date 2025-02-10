import MessageView from '../view/message-view';
import { render, remove, RenderPosition } from '../framework/render';

export default class MessagePresenter {
  #message = '';
  #messageComponent = null;
  #container = null;

  constructor(container) {
    this.#container = container;
  }

  newMessage(newMessage) {
    this.#message = newMessage;
    this.#clearMessage();

    this.#messageComponent = new MessageView(this.#message);
    render(this.#messageComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  clearMessage() {
    this.#clearMessage();
  }

  #clearMessage() {
    if (this.#messageComponent) {
      remove(this.#messageComponent);
      this.#messageComponent = null;
    }
  }
}
