import AbstractView from '../framework/view/abstract-view';
const createPreloadTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class PreloadMessageView extends AbstractView {
  #message = '';

  constructor(message){
    super();
    this.#message = message;
  }

  get template(){
    return createPreloadTemplate(this.#message);
  }
}
