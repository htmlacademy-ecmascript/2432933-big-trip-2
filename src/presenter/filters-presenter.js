import FilterEventsView from '../view/filters-events-view.js';
import { render } from '../framework/render';
import { tripControlsElement } from '../elements.js';
import { generateFilter } from '../mock/filter.js';

export default class FiltersPresenter {
  constructor(points){
    this.points = points;
  }

  init(){
    render(new FilterEventsView({ filters: generateFilter(this.points) }), tripControlsElement);
  }
}
