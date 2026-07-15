const spollersArray = document.querySelectorAll('[data-spollers]');

if (spollersArray.length > 0) {
  // Obtaining regular spoilers
  const spollersRegular = Array.from(spollersArray).filter(item => {
    return !item.dataset.spollers.split(',')[0];
  });
  // Initializing regular spoilers
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  // Obtaining spoilers with media queries
  const spollersMedia = Array.from(spollersArray).filter(item => {
    return item.dataset.spollers.split(',')[0];
  });

  // Initializing spoilers with media queries
  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach(item => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Obtaining unique breakpoints
    let mediaQueries = breakpointsArray.map(item => {
      return `(${item.type}-width: ${item.value}px),${item.value},${
        item.type
      }`;
    });
    mediaQueries = mediaQueries.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

    // Working with each breakpoint
    mediaQueries.forEach(breakpoint => {
      const paramsArray = breakpoint.split(',');
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      // Objects with the required conditions
      const spollersArray = breakpointsArray.filter(item => {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      // Event
      matchMedia.addListener(() => {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }
  // Initializing
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach(spollersBlock => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init');
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener('click', setSpollerAction);
      } else {
        spollersBlock.classList.remove('_init');
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener('click', setSpollerAction);
      }
    });
  }
  // Working with content
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach(spollerTitle => {
        const isLocked = spollersBlock.hasAttribute('data-spoller-lock');
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex');
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true;
            if (isLocked) spollerTitle.style.pointerEvents = 'all';
          } else {
            if (isLocked) spollerTitle.style.pointerEvents = 'none';
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1');
          spollerTitle.nextElementSibling.hidden = false;
          if (isLocked) {
            if (spollerTitle.classList.contains('_active')) {
              spollerTitle.style.pointerEvents = 'none';
            } else {
              spollerTitle.style.pointerEvents = 'all';
            }
          }
        }
      });
    }
  }

  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller')
        ? el
        : el.closest('[data-spoller]');
      const spollersBlock = spollerTitle.closest('[data-spollers]');
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
      const lockSpoller = spollersBlock.hasAttribute('data-spoller-lock');

      if (!spollersBlock.querySelectorAll('._slide').length) {
        const isActive = spollerTitle.classList.contains('_active');

        if (oneSpoller && !isActive) {
          hideSpollersBody(spollersBlock);
        }

        if (lockSpoller) {
          if (!isActive) {
            // Activate the new one
            hideSpollersBody(spollersBlock, true); // Передаём lock = true
            spollerTitle.classList.add('_active');
            _slideDown(spollerTitle.nextElementSibling, 500);
            spollerTitle.style.pointerEvents = 'none';
          }
          // Otherwise we do nothing
        } else {
          spollerTitle.classList.toggle('_active');
          _slideToggle(spollerTitle.nextElementSibling, 500);
        }

        e.preventDefault();
      }
    }
  }

  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector(
      '[data-spoller]._active',
    );
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active');
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
      spollerActiveTitle.style.pointerEvents = 'all';
    }
  }
}

const _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
const _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    const height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
const _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
