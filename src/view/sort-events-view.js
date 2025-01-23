import AbstractView from '../framework/view/abstract-view';

const createSortItemTemplate = (sortTypes, currentSortType) => {
  const { type, isDisabled } = sortTypes;

  return `<div class="trip-sort__item  trip-sort__item--${type}">
              <input
              id="sort-${type}"
              class="trip-sort__input
              visually-hidden" type="radio"
              name="trip-sort"
              value="sort-${type}"
              ${(isDisabled) ? 'disabled' : ''}
              ${(type === currentSortType) ? 'checked' : ''}
              data-sort-type="${type}"
              >
              <label class="trip-sort__btn" for="sort-${type}"> ${type} </label>
            </div>`;
};


const createFormSortTemplate = (sortTypes = [], currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
         ${sortTypes.map((item) => createSortItemTemplate(item, currentSortType)).join('')}
          </form>`
);

export default class SortEventsView extends AbstractView {
  #sortTypes = [];
  #currentSortType = null;
  #handleSortTypeChange = null;


  constructor({ sortTypes, currentSortType, onSortTypeChange }){
    super();
    this.#sortTypes = sortTypes;
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createFormSortTemplate(this.#sortTypes, this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}

