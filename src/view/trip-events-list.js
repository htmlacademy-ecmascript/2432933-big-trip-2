import AbstractView from '../framework/view/abstract-view';

const createEventListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsList extends AbstractView {
  constructor({handleEditClick, handleCloseForm}) {
    super();
    this.handleEditClick = handleEditClick;
    this.handleCloseForm = handleCloseForm;
  }

  get template() {
    return createEventListTemplate();
  }

  setClickListener() {
    this.element?.addEventListener('click', this.#handleClick);
  }

  #handleClick = (event) => {
    const target = event.target.closest('.trip-events__item');
    const itemId = event.target.dataset.id;
    const editFormId = event.target.dataset.editId;
    if (target){

      if(itemId){
        this.handleEditClick(itemId);
      }

      if(editFormId){
        this.handleCloseForm(editFormId);
      }
    }
  };

}
