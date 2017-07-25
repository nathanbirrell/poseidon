let toolbar;
const fixedClass = '--fixed';
const focusedClass = '--focused';
let checkingScroll = false;
let focusedSection = null;
let focusedBtn = null;
let currentView;
let currentBtn;
let aboutView;
let aboutBtn;
let forecastView;
let forecastBtn;
let sections = [];
let revSections = [];
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
  revSections = sections.slice().reverse();
  spotBarInit = true;
}

const offsetRelTop = (el) => {
  const top = document.body.getBoundingClientRect().top;
  const elOffset = el.getBoundingClientRect().top;
  return elOffset - top;
}

window.onscroll = () => {
  !spotBarInit && InitSpotToolbar();
  if (!toolbar) { toolbar = document.getElementById('spot-toolbar'); }
  const pageOffset = document.body.scrollTop;

  if (!checkingScroll) {
    checkingScroll = true;
    window.setTimeout(() => {
      // Set fixed or non fixed state
      if ((!toolbar.classList.contains(fixedClass) && pageOffset >= 145) ||
        (toolbar.classList.contains(fixedClass) && pageOffset < 145)) {
        toolbar.classList.toggle(fixedClass);
      }

      // Set focused toolbar section
      if (revSections.length) {
        for (let s of revSections) {
          if (pageOffset >= (offsetRelTop(s.section) - 65)) {
            if (focusedSection !== s.section) {
              focusedBtn && focusedBtn.classList.remove(focusedClass);
              focusedBtn = s.button;
              focusedBtn.classList.add(focusedClass);
              focusedSection = s.section;
            }
            break;
          } else if (s.section === revSections[revSections.length - 1].section) {
            // Clear last section if not past it
            focusedBtn && focusedBtn.classList.remove(focusedClass);
            focusedBtn = null;
            focusedSection = null;
          }
        }
      }
      checkingScroll = false;
    }, 50);
  }
}

const scrollBySection = (val) => {
  !spotBarInit && InitSpotToolbar();
  const num = val - 1;
  const yOffset = offsetRelTop(sections[num].section) - 55;
  window.scrollTo(0, yOffset);
}
