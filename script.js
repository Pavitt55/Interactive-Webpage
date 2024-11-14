'use strict';

const modal = document.querySelector('.modal');
const overlaybtn = document.querySelector('.overlay');
const btncloseModal = document.querySelector('.btn--close-modal');
const btnopenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlaybtn.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlaybtn.classList.add('hidden');
};

btnopenModal.forEach(e => {
  e.addEventListener('click', openModal);
});

btncloseModal.addEventListener('click', closeModal);
overlaybtn.addEventListener('click', closeModal);

//here e refers to an event
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

//creating new element
const message = document.createElement('div');

//adding css class to the newly created element
message.classList.add('cookie-message');

//adding text and buttons in the element
message.innerHTML =
  'We are cookied for new functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';

//adding new elemnt to the top as a first child of the header
header.append(message);

//adding new element at the bottom as the last child of the header
//cloneNode mens we can make copies and true means that the child nodes will also eb copied in the clone elemnts
//header.append(message.cloneNode(true));

//deleting the element when clicking on the button
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.backgroundColor = '#37383d';
message.style.width = '104%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

/*
//iplementing scrolling to all the sections from nav
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    //  console.log(this);
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});*/

//event delegation for all the three elements in nav link
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //this if statement makes sure that when we click on the open space of the nav the click should not happen
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//TABBED COMPONENTS
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

//event delegation
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  /*if the click exists there will be no return if the click dont exist the function will be returned and the code after this 
  will not be executed*/
  if (!clicked) return;

  //remove activated classes or we can say hiding the content
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //activate tab
  clicked.classList.add('operations__tab--active');

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fade animation

const handlehover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    /*this is corresponding to the class name "nav__link" and not corresponding to the "nav" if we write it 
    outside the if statement then it will be corresponding to the "nav"*/
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    //console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');

    const opacity = this;
    siblings.forEach(function (el) {
      if (el !== link) {
        //console.log(el);
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

//passing arguments into eventhandler using the bind method
nav.addEventListener('mouseover', handlehover.bind(0.5));

//mouseout is the oposite of mouseover in this when we move the mouse away all the links opacity will be back to 1
nav.addEventListener('mouseout', handlehover.bind(1));

/*ADDING A STICKY NAVIGATION */
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const stickyNavoptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, stickyNavoptions);
headerObserver.observe(header);

/*REVEALING SECTIONS AS WE SCROLL */
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //if it is not intersecting then the code after this will not be executed and if it is intersecting the code will be executed
  entry.target.classList.remove('section--hidden');
};

const revealSectionOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  revealSectionOptions
);

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/*LAZY LOADING OF IMAGES */
const imgTargets = document.querySelectorAll('img[data-src]');

const imageLoadObject = {
  root: null,
  threshold: 0,
  rootMargin: '-100px',
};
const loadImage = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //if intersection is there replace src with dataset src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImage, imageLoadObject);
imgTargets.forEach(image => {
  imgObserver.observe(image);
});

/*BUILDING SLIDER COMPONENT THE BUTTONS LEFT AND RIGHT*/
const slides = document.querySelectorAll('.slide');
const buttonLeft = document.querySelector('.slider__btn--left');
const buttonRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0); // this is for keeping the side by side menas not letting them overlap
//0%,100%,200%

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};

buttonRight.addEventListener('click', nextSlide);
buttonLeft.addEventListener('click', prevSlide);

/*IMPLEMENTING DOTS AND KEYBOARD*/
document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots(); //this calling of function creates the dots

//event deligation by clicking on the dot and moving the slide to that dot only
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeDot(slide);
  }
});

const activeDot = function (slide) {
  console.log(slide);
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activeDot(0);
/*
//instead of this we will do event deligation by attaching eventhandler to the common parent element
tabs.forEach(t => t.addEventListener('click', () => console.log('tab')));
*/

/*
const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
//implementing scrolling to the section1 from the button=learn more

btnScroll.addEventListener('click', () => {
  console.log('smooth');
  section1.scrollIntoView({ behavior: 'smooth' });
});
///rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
//console.log(randomInt);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Target', e.target);
  console.log('Current Target', e.currentTarget);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Target', e.target);
  console.log('Current Target', e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Target', e.target);
  console.log('Current Target', e.currentTarget);
});
*/
