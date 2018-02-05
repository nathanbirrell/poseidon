import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);

    this._closeModal = this._closeModal.bind(this);
    this._handleOnKeydown = this._handleOnKeydown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleOnKeydown);
  }

  componentWillReceiveProps(nextProps) {
    // TODO: attempt to make this component self-contained, ie open/close states stay in here..
    // if (nextProps.isOpen && !this.props.isOpen) {
    //   this.setState({ isOpen: true });
    // }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleOnKeydown);
  }

  _handleOnKeydown(event) {
    const pressedEscape = event.keyCode === 27;
    if (pressedEscape) {
      this._closeModal();
    }
  }

  _closeModal() {
    // this.setState({ isOpen: false });
    if (!this.props.isOpen) { return; }
    this.props.toggleOpen();
  }

  render() {
    if (!this.props.isOpen) return null;

    return (
      <div>
        <span className="curtain -light" onClick={this._closeModal} role="presentation" />

        <div className="modal">
          <div className="modal__header">
            {this.props.header}
            <button onClick={this._closeModal} style={{margin: 0}}><Icon name="x" style={{margin: 0}} size={Icon.Size.MEDIUM} /></button>
          </div>
          <div className="modal__body">
            {this.props.children}
          </div>
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
};

export default Modal;