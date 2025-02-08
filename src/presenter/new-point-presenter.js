import EditFormView from '../view/edit-form-view';
import { render, remove, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #container = null;
  #offers = [];
  #destinations = [];
  #newFormPointComponent = null;
  #handleDataChange = null;
  #isNewPoint = false;

  constructor({ container, offers , destinations, onDataChange }){
    this.#container = container;
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

    render(this.#newFormPointComponent , this.#container.element, RenderPosition.AFTERBEGIN);
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
