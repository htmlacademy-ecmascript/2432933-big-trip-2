import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filter, currentFilter) => {
  const {type, count} = filter;
  const isDisabled = count === 0;

  const isChecked = currentFilter === type;

  return (`
    <div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
                  value="${type}"
                  ${isChecked ? 'checked' : ''}
                  ${isDisabled ? 'disabled' : ''}
                  >
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
                `);
};

const createFormFiltersTemplate = (filters, currentFilter) => {
  const filtersItem = filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('');

  return (`
  <div class="trip-controls__filters">
              <h2 class="visually-hidden">Filter events</h2>
              <form class="trip-filters" action="#" method="get">
                ${filtersItem}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>
            </div>
          `
  );
};

export default class FilterEventsView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilter, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFormFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleFilterTypeChange(evt.target.value);
  };
}
