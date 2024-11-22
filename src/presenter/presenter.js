import { render } from '../render';
import { FilterView } from '../view/filters';
import { SortView } from '../view/sort';
import { PointView, PointListView } from '../view/point-view';
import { EditFormPoint } from '../view/edit-form-view';
import { NewPointItem } from '../view/add-new-point';

const headerElement = document.querySelector('.trip-controls__filters');
const tripevents = document.querySelector('.trip-events');


class Presenter {
  constructor() {
    this.filter = new FilterView;
    this.sort = new SortView;
    this.listPoint = new PointListView;
    this.editPointItem = new EditFormPoint;
    this.newPoint = new NewPointItem;
  }

  init(){
    render(this.filter, headerElement);
    render(this.sort, tripevents);
    render(this.listPoint, tripevents);
    render(this.editPointItem, this.listPoint.getElement());

    this.addNewPoint();
    this.renderPoint();
  }

  renderPoint(){

    for (let i = 0; i < 3; i++){
      this.item = new PointView();
      render(this.item, this.listPoint.getElement());
    }
  }

  addNewPoint(){
    render(this.newPoint, this.listPoint.getElement());

  }
}


export { Presenter };
