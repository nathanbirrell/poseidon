import React from 'react';
import PropTypes from 'prop-types';
import jump from 'jump.js';

let checkingScroll = false;
let sections;
let revSections;

class SpotToolbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fixed: false,
      focusedId: '',
    };

    this.generateSections = this.generateSections.bind(this);
    this.initScroll = this.initScroll.bind(this);
  }

  componentDidMount() {
    sections = this.generateSections();
    revSections = sections.slice().reverse();
    this.initScroll();
  }

  offsetRelTop(el) {
    if (el) {
      const top = document.body.getBoundingClientRect().top;
      const elOffset = el.getBoundingClientRect().top;
      return elOffset - top;
    }
    return null;
  }

  generateSections() {
    return this.props.items.map(i => {
      return ({
        id: i.id,
        el: document.getElementById(`${i.id}-section`),
      });
    });
  }

  initScroll() {
    window.onscroll = () => {
      const pageOffset = document.body.scrollTop;

      if (!checkingScroll) {
        checkingScroll = true;
        window.setTimeout(() => {
          // Set fixed or non fixed state
          if ((!this.state.fixed && pageOffset >= 145) ||
            (this.state.fixed && pageOffset < 145)) {
              this.setState({
                fixed: !this.state.fixed,
              });
          }

          // Set focused toolbar section
          if (revSections.length) {
            for (let s of revSections) {
              if (pageOffset >= (this.offsetRelTop(s.el) - 65)) {
                if (this.state.focusedId !== s.id) {
                  this.setState({
                    focusedId: s.id,
                  });
                }
                break;
              } else if (s.id === revSections[revSections.length - 1].id) {
                if (this.state.focusedId !== s.id) {
                  // Select top most section if not past it and not already selected
                  this.setState({
                    focusedId: s.id,
                    fixed: false,
                  });
                }
              }
            }
          }
          checkingScroll = false;
        }, 25);
      }
    }
  }

  scrollToSection(number, event) {
    event && event.preventDefault();
    this.scrollToSelector(`#${this.props.items[number].id}-section`);
  }

  scrollToSelector(selector) {
    const yOffset = this.state.fixed ? -55 : -115;
    jump(selector, {
      offset: yOffset,
    });
  }

  render() {
    if (!this.props.items) {
      return null;
    }

    return (
      <div id="spot-toolbar" className={"row spot-toolbar " + (this.state.fixed ? "--fixed" : null)}>
        <div className="small-12 medium-5 columns">
          <div className="row">
            {this.props.items.map((i, j) => {
              return (
                <div key={j} id={`${i.id}-btn`} className={"small-3 columns spot-toolbar__item " + (i.id === this.state.focusedId ? "--focused" : null)} onClick={() => { this.scrollToSection(j) }}>
                  <a>
                    <span className="spot-toolbar__label">{i.label}</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

SpotToolbar.defaultProps = {
  items: null,
}

SpotToolbar.propTypes = {
  items: PropTypes.array,
}

export default SpotToolbar;
