import { eventsListElement } from '../elements';


export default class TripEventsListView {
  constructor({ handleEditClick, handleCloseForm, handleFavorite }) {
    this.handleEditClick = handleEditClick;
    this.handleCloseForm = handleCloseForm;
    this.handleFavorite = handleFavorite;
    eventsListElement.addEventListener('click', this.#handleClick);
  }

  setClickListener() {
    eventsListElement.addEventListener('click', this.#handleClick);
  }

  #handleClick = (event) => {
    const item = event.target.closest('.trip-events__item');

    if (!item) {
      return;
    }

    const itemId = item.dataset.item;
    const favorite = event.target.closest('.event__favorite-btn');
    const rollup = event.target.classList.contains('item');
    const rollupEdit = event.target.classList.contains('edit');
    if (rollup) {
      this.handleEditClick(itemId);
      return;
    }

    if (favorite) {
      this.handleFavorite(itemId);
    }

    if (rollupEdit) {
      this.handleCloseForm(itemId);

    }

  };
}

