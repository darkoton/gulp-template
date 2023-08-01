let tabs = () => {
  let nav = document.querySelectorAll('.main__tab'),
    result = document.querySelectorAll('.main__tab-result'),
    tabName

  nav.forEach(item => {
    item.addEventListener('click', selectnav)
  })

  function selectnav() {
    nav.forEach(item => {
      item.classList.remove('_active');
    });
    this.classList.add('_active')
    tabName = this.getAttribute('data-tab-name')
    selectresult(tabName)
  }

  function selectresult(tabName) {
    result.forEach(item => {
      item.classList.contains(tabName) ? item.classList.add('_active') : item.classList.remove('_active')
    })
  }
}

tabs()