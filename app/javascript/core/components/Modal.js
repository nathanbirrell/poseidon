import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import Icon from 'core/components/Icon';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);

    this._closeModal = this._closeModal.bind(this);
    this._handleOnKeydown = this._handleOnKeydown.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const wasOpened = nextProps.isOpen && !this.props.isOpen;
    const wasClosed = !nextProps.isOpen && this.props.isOpen;

    if (wasOpened) {
      document.addEventListener('keydown', this._handleOnKeydown);
      document.addEventListener('click', this._handleOutsideClick);
    }

    if (wasClosed) {
      document.removeEventListener('keydown', this._handleOnKeydown);
      document.removeEventListener('click', this._handleOutsideClick);
    }
  }

  _handleOnKeydown(event) {
    const pressedEscape = event.keyCode === 27;
    if (pressedEscape) {
      this._closeModal();
    }
  }

  _handleOutsideClick(event) {
    if (!this.props.isOpen) { return; }

    // ignore clicks on the component itself
    if (this.node.contains(event.target)) { return; }

    this._closeModal();
  }

  _closeModal() {
    // this.setState({ isOpen: false });
    if (!this.props.isOpen) { return; }
    this.props.toggleOpen();
  }

  render() {
    const modalClasses = Classnames({
      modal: true,
      '--is-visible': this.props.isOpen,
    });

    return (
      <div className={modalClasses}>
        <div className="modal-container" ref={(nodeRef => { this.node = nodeRef; })}>

          <div className="modal-header">
            {this.props.headerLabel ? (<p className="modal-header__label">{this.props.headerLabel}</p>) : null}
            <p className="modal-header__heading">{this.props.header}</p>
          </div>

          <div className="modal-content">
            {this.props.children}
          </div>

          {this.props.footer ? (
            <div className="modal-footer">
              {this.props.footer}
            </div>)
          : null}


          <button className="modal-close" onClick={this._closeModal} style={{ margin: 0 }}><Icon name="x" style={{ margin: 0 }} size={Icon.Size.MEDIUM} className="modal-close__icon" /></button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  headerLabel: PropTypes.string,
};

Modal.defaultProps = {
  footer: null,
  headerLabel: null,
};

export default Modal;