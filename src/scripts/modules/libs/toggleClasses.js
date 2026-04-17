Element.prototype.toggleClasses = function (classes, force) {
  classes.flat().forEach(cls => this.classList.toggle(cls, force));
};
