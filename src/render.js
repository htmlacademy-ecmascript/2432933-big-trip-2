const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.getElement());
}

const createItemTemplate = (template) => template;


class BaseView {

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());

    }
    return this.element;
  }
}

export {RenderPosition, createElement, render, createItemTemplate, BaseView};
