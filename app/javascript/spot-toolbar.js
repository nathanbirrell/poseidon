import jump from 'jump.js';

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

class SpotToolbar {
  constructor () {
    this.init.bind(this);
    this.initScroll.bind(this);
    this.init();
  }

  offsetRelTop(el) {
    const top = document.body.getBoundingClientRect().top;
    const elOffset = el.getBoundingClientRect().top;
    return elOffset - top;
  }

  initScroll() {
    window.onscroll = () => {
      !spotBarInit && InitSpotToolbar();
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
              if (pageOffset >= (this.offsetRelTop(s.section) - 65)) {
                if (focusedSection !== s.section) {
                  focusedBtn && focusedBtn.classList.remove(focusedClass);
                  focusedBtn = s.button;
                  focusedBtn.classList.add(focusedClass);
                  focusedSection = s.section;
                }
                break;
              } else if (s.section === revSections[revSections.length - 1].section) {
                if (s.section !== focusedSection) {
                  // Select top most section if not past it and not already selected
                  focusedBtn && focusedBtn.classList.remove(focusedClass);
                  focusedBtn = s.button;
                  focusedSection = s.section;
                  focusedBtn.classList.add(focusedClass);
                }
              }
            }
          }
          checkingScroll = false;
        }, 50);
      }
    }
  }

  scrollToSelector(selector, event) {
    event.preventDefault();
    const yOffset = !toolbar.classList.contains(fixedClass) ? -114 : -55;
    jump(selector, {
      offset: yOffset,
    });
  }

  init() {
    toolbar = document.getElementById('spot-toolbar');
    currentView = document.getElementById('current-view');
    currentBtn = document.getElementById('current-btn');
    aboutView = document.getElementById('about-view');
    aboutBtn = document.getElementById('about-btn');
    forecastView = document.getElementById('forecast-view');
    forecastBtn = document.getElementById('forecast-btn');
    historyView = document.getElementById('history-view');
    historyBtn = document.getElementById('history-btn');
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
      },
      {
        section: historyView,
        button: historyBtn
      }
    ];

    // Set first section focused on load
    focusedBtn = sections[0].button;
    focusedSection = sections[0].section;
    focusedBtn.classList.add(focusedClass);

    revSections = sections.slice().reverse();
    spotBarInit = true;
    this.initScroll();

    currentBtn.addEventListener('click', (event) => {
      this.scrollToSelector('#current-view', event);
    });
    aboutBtn.addEventListener('click',  (event) => {
      this.scrollToSelector('#about-view', event);
    });
    forecastBtn.addEventListener('click', (event) => {
      this.scrollToSelector('#forecast-view', event);
    });
    historyBtn.addEventListener('click', (event) => {
      this.scrollToSelector('#history-view', event);
    });
  }
};

export default SpotToolbar;
