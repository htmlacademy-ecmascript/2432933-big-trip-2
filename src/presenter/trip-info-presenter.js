import TripInfoView from '../view/trip-info-view';
import { render, remove, RenderPosition } from '../framework/render';
import { getPointsDateDifference } from '../utils/sorting';
import { getEventDate } from '../utils/formatDate';
import { findByKey } from '../utils/utils';
import { eventsTripInfo } from '../elements';

export default class TripInfoPresenter {
  #eventModel = null;
  #tripInfoViewComponent = null;
  #totalSum = 0;
  #title = '';
  #points = [];
  #offers = [];
  #destinations = [];
  #startDate = '';
  #endDate = '';
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
    this.#getTotalSum();

    this.#tripInfoViewComponent = new TripInfoView({
      totalSum  : this.#totalSum,
      title     : this.#getTitleDestinations(),
      startDate : this.#getStartedDate(),
      endDate   : this.#getEndDate(),
    });

    render(this.#tripInfoViewComponent, eventsTripInfo, RenderPosition.AFTERBEGIN);
  }

  destroy () {
    if (this.#tripInfoViewComponent !== null) {
      remove(this.#tripInfoViewComponent);
    }
  }

  #getTitleDestinations() {
    const destinationsNames = this.#points.map((point) => findByKey(this.#destinations, 'id', point.destination).name || {});
    this.#title = destinationsNames.length <= 3 ? destinationsNames.join(' — ') : `${destinationsNames[0]} —... — ${destinationsNames[destinationsNames.length - 1]}`;
    return this.#title;
  }

  #getStartedDate() {
    this.#startDate = getEventDate(this.#points[0]?.dateFrom, 'D');
    return this.#startDate;
  }

  #getEndDate() {
    this.#endDate = getEventDate(this.#points[this.#points.length - 1]?.dateFrom, 'D MMM');
    return this.#endDate;
  }

  #getTotalSum() {
    const calculateOffersSum = (point) => {
      const offersType = findByKey(this.#offers, 'type', point.type).offers;
      return offersType
        .filter((offer) => point.offers.includes(offer.id))
        .reduce((sum, offer) => sum + offer.price, 0);
    };

    const sumBasePrice = this.#points.reduce((acc, point) => acc + point.basePrice, 0);
    const sumOffers = this.#points.reduce((acc, point) => acc + calculateOffersSum(point), 0);

    this.#totalSum = sumBasePrice + sumOffers;
    return this.#totalSum;
  }

  #handleModelEvent = () => {
    this.init();
  };

}
