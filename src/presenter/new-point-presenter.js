import EditFormView from '../view/edit-form-view';
import { render, remove, RenderPosition } from '../framework/render.js';
import { eventsListElement } from '../elements.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #offers = null;
  #destinations = null;
  #newFormPointComponent = null;
  #handleDataChange = null;
  #isNewPoint = false;

  constructor({ offers , destinations, onDataChange }){
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
  }

  init() {
    if(this.#newFormPointComponent !== null){
      return;
    }

    this.#newFormPointComponent = new EditFormView({
      offers        : this.#offers,
      destinations  : this.#destinations,
      onDeleteClick : this.#handleCancelClick,
      onFormSubmit  : this.#handleFormSubmit,
      isNewPoint    : true,
    });

    render(this.#newFormPointComponent , eventsListElement, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escapeCloseHandler);
    this.#isNewPoint = true;
  }

  destroy() {
    if(this.#newFormPointComponent === null){
      return;
    }

    remove(this.#newFormPointComponent);
    document.removeEventListener('keydown', this.#escapeCloseHandler);
    this.#newFormPointComponent = null;
    this.#isNewPoint = false;
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MINOR, point);
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  get mode(){
    return this.#isNewPoint;
  }

  #escapeCloseHandler = (evt) => {
    if (evt.key === 'Escape'){
      evt.preventDefault();
      this.destroy();
    }
  };

}
