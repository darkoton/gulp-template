document.querySelectorAll('[data-anchor]').forEach(anchor => {
  const id = anchor.hash;

  anchor.addEventListener('click', e => {
    e.preventDefault();

    scrollToBock(id, anchor);
  });
});

function scrollToBock(id, anchor) {
  document.querySelectorAll('[data-anchor]').forEach(a => {
    a.classList.remove('active');
    a.classList.add('active');
  });

  if (!id) {
    return;
  }

  let section = document.querySelector(id);

  if (section) {
    window.history.pushState(null, null, id);

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });

    if (anchor) {
      anchor.classList.add('active');
      // anchor.classList.remove('active');
    }
  } else if (anchor && anchor.dataset.page) {
    window.location.href = `${anchor.dataset.page}${id}`;
  }
}

function scrollToBlockOnload() {
  scrollToBock(location.hash, document.querySelector(`[href="${location.hash}"]`));
}

window.onload = () => {
  scrollToBlockOnload();
};
