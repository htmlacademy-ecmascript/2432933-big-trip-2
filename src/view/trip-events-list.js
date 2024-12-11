import BaseView from '../render';

const createEventListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsList extends BaseView{
  get template() {
    return createEventListTemplate();
  }

}
