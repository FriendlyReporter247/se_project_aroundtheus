class Section {
    constructor({ renderer }, containerSelector) {
            this.renderer = renderer;
      this.container = document.querySelector(containerSelector);
    }
  
    renderItems(items) {
      items.forEach(item => {
        const element = this.renderer(item);
        this.addItem(element);
      });
    }

    addItem(element) {
      this.container.prepend(element);
    }


}

export default Section;