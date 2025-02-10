import EditFormView from '../view/edit-form-view';
import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import { newPointButtonElement } from '../elements.js';

export default class NewPointPresenter {
  #container = null;
  #offers = [];
  #destinations = [];
  #newFormPointComponent = null;
  #handleDataChange = null;
  #isNewPoint = false;
  #checkNoPoints = null;

  constructor({ container, offers , destinations, onDataChange, onCheckNoPoints}){
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#checkNoPoints = onCheckNoPoints;
  }

  get mode(){
    return this.#isNewPoint;
  }

  init() {
    if(this.#newFormPointComponent !== null){
      return;
    }

    this.#newFormPointComponent = new EditFormView({
      offers            : this.#offers,
      destinations      : this.#destinations,
      onDeleteClick     : this.#handleCloseForm,
      onFormSubmitClick : this.#handleFormSubmit,
      isNewPoint        : true,
    });

    render(this.#newFormPointComponent , this.#container.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscapeCloseClick);
    this.#isNewPoint = true;
    newPointButtonElement.disabled = true;
  }

  destroy() {
    if(this.#newFormPointComponent === null){
      return;
    }

    remove(this.#newFormPointComponent);
    document.removeEventListener('keydown', this.#onEscapeCloseClick);
    this.#newFormPointComponent = null;
    this.#isNewPoint = false;
    newPointButtonElement.disabled = false;

  }

  setSaving() {
    this.#newFormPointComponent.updateElement({
      isDisabled : true,
      isSaving   : true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newFormPointComponent.updateElement({
        isDisabled : false,
        isSaving   : false,
        isDeleting : false,
      });
    };

    this.#newFormPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MINOR, point);
  };

  #handleCloseForm = () => {
    this.destroy();
    this.#checkNoPoints();
  };

  #onEscapeCloseClick = (evt) => {
    if (evt.key === 'Escape'){
      evt.preventDefault();
      this.#handleCloseForm();
    }
  };

}
