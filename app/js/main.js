const slider = document.querySelector(".swiper");

const continueBtn = document.querySelector(".banner__btn button");
const costOne = document.querySelector('.banner__costs-one');
const costTwo = document.querySelector('.banner__costs-two');
const costThree = document.querySelector('.banner__costs-three');
const costItems = document.querySelectorAll('.banner__costs-item');
const slides = document.querySelectorAll('.swiper-slide ');

/*Slider*/
const sl = new Swiper(slider, {
  speed: 5000,
  spaceBetween: 0,
  loop: true,
  allowTouchMove: true,
  followFinger: false,
  simulateTouch: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  grabCursor: true,
  centeredSlides: true,

  slidesPerView: "1",
  autoplay: {
    enabled: true,
    delay: 1,
  },
});

/*Add active focus on costs items */
function costsItemsPlugin(activeCostItem) {
  costItems[activeCostItem].classList.add('active');

for (let costItem of costItems) {
  costItem.addEventListener('click', () => {
    clearActiveClasses();

    costItem.classList.add('active');
  })
}

function clearActiveClasses() {
  costItems.forEach((costItem) => {
    costItem.classList.remove('active')
  })
}
}

costsItemsPlugin(1);


/*Go to another page */
function goToAnotherPage () {
  const activeItem = document.querySelector('.active');

  if (costOne.contains(activeItem)) {
    return window.open("https://www.google.com/search?q=1");
  } else if (costTwo.contains(activeItem)) {
    return window.open("https://www.google.com/search?q=2");
  } else if (costThree.contains(activeItem)) {
    return window.open("https://www.google.com/search?q=3");
  } else alert("Please, select item!");
};

continueBtn.addEventListener('click', goToAnotherPage);

/*Function with adding dark theme*/
function addDarkTheme() {
  document.body.classList.add('dark-theme');
  for(let slide of slides) {
  slide.classList.add('dark-theme-slide');
  }

  for(let costItem of costItems) {
    costItem.classList.add('dark-theme-item')
  }
}

/*Function with removing dark theme*/
function removeDarkTheme() {
  document.body.classList.remove('dark-theme');

  costItems.forEach((costItem) => {
    costItem.classList.remove('dark-theme-item')
  })
  slides.forEach((slide) => {
    slides.classList.remove('dark-theme-slide')
  }) 
  
}

//addDarkTheme()
//removeDarkTheme() 