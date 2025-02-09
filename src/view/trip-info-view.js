import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoTemplate = ({ title, totalSum, startDate, endDate}) => (
  `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${title}</h1>

              <p class="trip-info__dates">${startDate}&nbsp;—&nbsp;${endDate}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
            </p>
          </section>`
);

export default class TripInfoView extends AbstractView {
  #title = '';
  #startDate = '';
  #endDate = '';
  #totalSum = '';

  constructor({ title, totalSum, startDate, endDate }){
    super();
    this.#title = title;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#totalSum = totalSum;
  }

  get template() {
    return createTripInfoTemplate({
      title     : this.#title,
      startDate : this.#startDate,
      endDate   : this.#endDate,
      totalSum  : this.#totalSum
    });
  }
}
