import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // TODO: attempt to make this component self-contained, ie open/close states stay in here..
    // if (nextProps.isOpen && !this.props.isOpen) {
    //   this.setState({ isOpen: true });
    // }
  }

  closeModal() {
    // this.setState({ isOpen: false });
    this.props.toggleOpen();
  }

  render() {
    if (!this.props.isOpen) return null;

    return (
      <div>
        <div className="curtain -light" onClick={this.closeModal}></div>
        <div className="modal">
          <div className="modal__header">
            {this.props.header}
            <button onClick={this.closeModal} style={{margin: 0}}><Icon name="x" style={{margin: 0}} size={Icon.Size.MEDIUM} /></button>
          </div>
          <div className="modal__body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.PropTypes = {
  header: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;