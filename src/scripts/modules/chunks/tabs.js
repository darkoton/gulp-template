export const tabs = ({ tabSelector, tabResultSelector, tabClassesActive = [], tabClassesNoActive = [], resultClassesActive = [], resultClassesNoActive = [] }) => {
  let nav = document.querySelectorAll(tabSelector),
    result = document.querySelectorAll(tabResultSelector),
    tabName;

  nav.forEach(item => {
    item.addEventListener('click', selectnav);
  });

  function selectnav() {
    nav.forEach(item => {
      item.classList.remove(...tabClassesActive);
      item.classList.add(...tabClassesNoActive);
    });
    this.classList.add(...tabClassesActive);
    this.classList.remove(...tabClassesNoActive);

    tabName = this.getAttribute('data-tab-name');
    selectresult(tabName);
  }

  function selectresult(tabName) {
    result.forEach(item => {
      item.classList.contains(tabName)
        ? (() => {
            item.classList.add(...resultClassesActive);
            item.classList.remove(...resultClassesNoActive);
          })()
        : (() => {
            item.classList.remove(...resultClassesActive);
            item.classList.add(...resultClassesNoActive);
          })();
    });
  }
};
