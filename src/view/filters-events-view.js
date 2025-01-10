import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filter, isChecked) => {
  const {type, count} = filter;
  const isDisabled = count === 0;

  return (`
    <div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
                  value="
                  ${type}"
                  ${isChecked ? 'checked' : ''}
                  ${isDisabled ? 'disabled' : ''}
                  >
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
                `);
};

const createFormFiltersTemplate = (filters) => {
  const filtersItem = filters.map((filter, index) => createFilterItemTemplate(filter, index === 3)).join('');

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

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFormFiltersTemplate(this.#filters);
  }
}
