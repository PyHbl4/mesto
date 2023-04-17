export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._container.append(this._renderer(item));
        });
    }

    addItem() {
        this._items.forEach((item) => {
            this._container.prepend(this._renderer(item));
        });
    }
}