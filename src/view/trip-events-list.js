import BaseView from '../render';

const createTripEventListTemplate = () => '<ul class="trip-events__list"></ul>';


export default class EventListView extends BaseView{
  get template() {
    return createTripEventListTemplate();
  }

}
