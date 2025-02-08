import FilterEventsView from '../view/filters-events-view.js';
import { render, remove, replace } from '../framework/render';
import { tripControlsElement } from '../elements.js';
import { generateFilters } from '../utils/filter.js';
import { UpdateType } from '../const.js';

export default class FiltersPresenter {
  #eventModel = null;
  #filtersModel = null;
  #currentFilter = null;
  #filterComponent = null;

  constructor({ eventModel, filtersModel }){
    this.#eventModel = eventModel;
    this.#filtersModel = filtersModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#eventModel.allPoints;
    const filters = generateFilters(points);

    return filters;
  }

  init(){
    this.#currentFilter = this.#filtersModel.currentFilter;
    const filters = this.filters;

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterEventsView({
      filters,
      currentFilter      : this.#currentFilter,
      onFilterTypeChange : this.#filterChangeHandler,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, tripControlsElement);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filterChangeHandler = (filterType) => {
    if (this.#filtersModel.currentFilter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
