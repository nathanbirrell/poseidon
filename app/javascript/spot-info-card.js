const expandFnClass = 'fn-expand-info-card';
const expandedClass = '--expanded';
const expandLabel = 'Show more';
const collapseLabel = 'Show less';
let elements;

class SpotInfoCard {
  constructor () {
    this.init.bind(this);
    this.init();
  }

  init() {
    elements = document.getElementsByClassName(expandFnClass);
    Array.prototype.forEach.call(elements, (function(el) {
      el.addEventListener('click', (event) => {
        event.preventDefault();
        const topLevel = el.closest('.info-card');
        if (topLevel.classList.contains(expandedClass)) {
          el.innerText = expandLabel;
        } else {
          el.innerText = collapseLabel;
        }
        topLevel.classList.toggle(expandedClass);
      });
    }));
  }
};

export default SpotInfoCard;
