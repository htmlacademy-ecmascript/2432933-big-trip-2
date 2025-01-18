import { eventsListElement } from '../elements';

export default class TripEventsListView {
  constructor({ handleEditClick, handleCloseForm, handleFavorite }) {
    this.handleEditClick = handleEditClick;
    this.handleCloseForm = handleCloseForm;
    this.handleFavorite = handleFavorite;
  }

  setClickListener() {
    eventsListElement.addEventListener('click', this.#handleClick);
  }

  #handleClick = (event) => {
    const item = event.target.closest('.trip-events__item');
    const itemId = item.dataset.item;
    const favorite = event.target.closest('.event__favorite-btn');
    const rollup = event.target.classList.contains('event__rollup-btn');

    if (rollup) {
      this.handleEditClick(itemId);
    }

    if (favorite) {
      this.handleFavorite(itemId);
    }

  };
}

