import TripInfoView from '../view/trip-info-view';
import { render, remove, RenderPosition } from '../framework/render';
import { getPointsDateDifference } from '../utils/sorting';
import { getEventDate } from '../utils/formatDate';
import { findByKey } from '../utils/utils';
import { eventsTripInfoElement } from '../elements';

export default class TripInfoPresenter {
  #eventModel = null;
  #tripInfoViewComponent = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor(eventModel){
    this.#eventModel = eventModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#points = getPointsDateDifference(this.#eventModel.allPoints);
    this.#destinations = this.#eventModel.allDestinations;
    this.#offers = this.#eventModel.allOffers;
  }

  init() {
    if (this.#tripInfoViewComponent !== null) {
      return;
    }

    this.#tripInfoViewComponent = new TripInfoView({
      totalSum  : this.#calculateTotalSum(),
      title     : this.#getTitleDestinations(),
      startDate : this.#getStartedDate(),
      endDate   : this.#getEndDate(),
    });

    render(this.#tripInfoViewComponent, eventsTripInfoElement, RenderPosition.AFTERBEGIN);
  }

  destroy () {
    if (this.#tripInfoViewComponent !== null) {
      remove(this.#tripInfoViewComponent);
    }
  }

  #getTitleDestinations() {
    const destinationsNames = this.#points.map((point) => findByKey(this.#destinations, 'id', point.destination)?.name || []);
    return destinationsNames.length <= 3 ? destinationsNames.join(' — ') : `${destinationsNames[0]} —... — ${destinationsNames[destinationsNames.length - 1]}`;
  }

  #getStartedDate() {
    return getEventDate(this.#points[0]?.dateFrom, 'D');
  }

  #getEndDate() {
    return getEventDate(this.#points[this.#points.length - 1]?.dateTo, 'D MMM');
  }

  #calculateTotalSum() {
    return this.#points.reduce((acc, point) => {
      const offersType = findByKey(this.#offers, 'type', point.type).offers;
      const offersSum = offersType.filter((offer) => point.offers.includes(offer.id)).reduce((sum, offer) => sum + offer.price, 0);
      return acc + point.basePrice + offersSum;
    }, 0);
  }

  #handleModelEvent = () => {
    this.init();
  };

}
