const header = document.getElementById('header');
const burgerMenu = document.getElementById('menuBurger');
const burgerMenuBackdrop = document.getElementById('menuBurgerBarkdrop');
const burgerButton = document.getElementById('burgerButton');
const openIcon = document.getElementById('burgerOpenIcon');
const closeIcon = document.getElementById('burgerCloseIcon');

// Tailwind CSS
// function openMenu() {
//   document.body.classList.toggle('overflow-hidden');
//   openIcon.classList.toggle('hidden');
//   closeIcon.classList.toggle('hidden');
//   burgerMenu.toggleClasses(['translate-x-full', 'pointer-events-none']);
//   burgerMenuBackdrop.toggleClasses(['opacity-0', 'pointer-events-none']);

//   if (header.hasAttribute('data-fixed')) {
//     header.toggleClasses(['bg-dark/60', 'backdrop-blur-[5px]']);
//   }
// }

// Native style
function openMenu() {
  document.body.classList.toggle('_lock-scroll');
  openIcon.classList.toggle('active');
  closeIcon.classList.toggle('active');
  burgerMenu.classList.toggle('active');
  burgerMenuBackdrop.classList.toggle('active');

  if (header.hasAttribute('data-fixed')) {
    header.classList.toggle('fixed');
  }
}

burgerMenu.querySelectorAll('[data-anchor]').forEach(anchor => {
  anchor.addEventListener('click', () => {
    openMenu();
  });
});

burgerButton.addEventListener('click', openMenu);
burgerMenuBackdrop.addEventListener('click', openMenu);
