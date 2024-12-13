import { eventsContainerElement, tripControlsElement } from '../const';
import { render } from '../render';
import TripEventsItem from '../view/trip-events-item';
import TripEventsList from '../view/trip-events-list';
import EditFormView from '../view/edit-form-view';
import SortEvents from '../view/sort-events';
import FilterEvents from '../view/filters-events';

export default class TripPresenter {
  eventList = new TripEventsList();
  eventModel = {};
  container = eventsContainerElement;

  constructor({ eventModel }){
    //this.container = container;
    this.eventModel = eventModel;
  }

  init(){
    const { points, offers, destinations } = this.eventModel.retrieveAllData;

    this.renderSortingAndFilters();
    this.renderEditEvents(points, offers, destinations);
    this.renderItemEvents(points, offers, destinations);
  }

  renderEditEvents(points, offers, destinations){
    return render(new EditFormView({ point: points[0], offers, destinations }), this.eventList.getElement());
  }

  renderItemEvents(points, offers, destinations){
    for (let i = 1; i < points.length; i++){
      render(new TripEventsItem({ point: points[i], offers, destinations }), this.eventList.getElement());
    }
  }

  renderSortingAndFilters() {
    render(new SortEvents(), eventsContainerElement);
    render(new FilterEvents(), tripControlsElement);
    render(this.eventList, this.container);
  }

}

