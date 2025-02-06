import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class EventModel extends Observable{
  #points = [];
  #offers = [];
  #destinations = [];
  #pointsApiService = null;

  constructor({ pointsApiService }){
    super();
    this.#pointsApiService = pointsApiService;
  }

  get allPoints() {
    return [...this.#points];
  }

  get allOffers () {
    return [...this.#offers];
  }

  get allDestinations(){
    return [...this.#destinations];
  }

  async init(){
    try {
      const points = await this.#pointsApiService.points;
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;
      this.#points = points.map(this.#adaptToClient);

      this._notify(UpdateType.INIT);

    } catch(error) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];

      this._notify(UpdateType.FATAL);
    } // Добавить блокировку кнопки
  }

  async updatePoint(type, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1){
      return;
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(type, updatedPoint);
    } catch (error) {
      throw new Error(error);
    }
  }

  addPoint(type, updatedPoint) {
    this.#points = [
      updatedPoint,
      ...this.#points,
    ];
    this._notify(type, updatedPoint);
  }

  deletePoint(type, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);
    if (index === -1){
      return;
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(type, updatedPoint);
  }

  #adaptToClient(point){
    const adaptedPoint = {
      ...point,
      basePrice : point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}

