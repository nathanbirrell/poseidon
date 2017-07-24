let toolbar;
const fixedClass = '--fixed';
const focusedClass = '--focused';
let focusedSection;
let focusedBtn;
let currentView;
let currentBtn;
let aboutView;
let aboutBtn;
let forecastView;
let forecastBtn;
let sections;
let spotBarInit = false;

const InitSpotToolbar = () => {
  currentView = document.getElementById('current-view');
  currentBtn = document.getElementById('current-btn');
  aboutView = document.getElementById('about-view');
  aboutBtn = document.getElementById('about-btn');
  forecastView = document.getElementById('forecast-view');
  forecastBtn = document.getElementById('forecast-btn');
  sections = [
    {
      section: currentView,
      button: currentBtn
    },
    {
      section: aboutView,
      button: aboutBtn
    },
    {
      section: forecastView,
      button: forecastBtn
    }
  ];
  spotBarInit = true;
}

const offsetRelTop = (el) => {
  const top = document.body.getBoundingClientRect().top;
  const elOffset = el.getBoundingClientRect().top;
  return elOffset - top;
}

window.onscroll = () => {
  if (!toolbar) { toolbar = document.getElementById('spot-toolbar'); }
  const pageOffset = document.body.scrollTop;

  // Set fixed or non fixed state
  if ((!toolbar.classList.contains(fixedClass) && pageOffset >= 145) ||
    (toolbar.classList.contains(fixedClass) && pageOffset < 145)) {
    toolbar.classList.toggle(fixedClass);
  }

  let foundSection;
  // Set focused toolbar section
  for (let s of sections) {
    if (pageOffset >= offsetRelTop(s.section)) {
      // GO THROUGH SECTIONS IN REVERSE ORDER AND SELECT FARTHEST ONE WE HAVE PASSED
    }
  }
}

const scrollBySection = (val) => {
  !spotBarInit && InitSpotToolbar();
  const num = val - 1;
  console.log(sections);
  if (focusedSection !== sections[num].section) {
    focusedSection = sections[num].section;
    focusedBtn = sections[num].button;
    const yOffset = offsetRelTop(sections[num].section) - 65;
    window.scrollTo(0, yOffset);
  }
}
