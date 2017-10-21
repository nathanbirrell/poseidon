import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import clipboard from 'clipboard-js';
import { Route } from 'react-router-dom';

import Modal from 'components/Modal';

class SpotShareContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      isShareModalOpen: false,
      appId: 321161578347645,
    };

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.handleShareModalToggle = this.handleShareModalToggle.bind(this);
  }

  componentWillReceiveProps() {
    this.state.copied = false;
  }

  handleShareModalToggle() {
    this.setState({
      isShareModalOpen: !this.state.isShareModalOpen
    });
  }

  shareText() {
    return encodeURIComponent(`Check out ${this.props.spotName} at ${this.props.selectedMoment.format('ha, dddd Do MMM')}`);
  }

  shareUrl() {
    const output = `${[location.protocol, '//', location.host, location.pathname].join('')}?date_time=${this.props.selectedMoment.format()}`;
    return output;
  }

  copyToClipboard() {
    clipboard.copy(this.shareUrl());
    this.setState({
      copied: true,
    });
  }

  render() {
    return (
      <div>
        <div className="grid-x">
          <div className="cell">
            <button className="btn --icon --icon-share-2--white" onClick={this.handleShareModalToggle}>Share session</button>
          </div>
        </div>

        <Modal
          isOpen={this.state.isShareModalOpen}
          toggleOpen={this.handleShareModalToggle}
          header="Share session"
        >
          <div className="share-menu">
            <p className="name"><strong>{this.props.spotName}</strong></p>
            <p className="date_time">@ {this.props.selectedMoment.format('ha, ddd D MMM')}</p>
            <a className="btn --circle  --icon --icon-message-circle--white --messenger" href={`fb-messenger://share/?link=${encodeURIComponent(this.shareUrl())}&app_id=${this.state.appId}`}></a>
            <a className="btn --circle  --icon --icon-facebook--white --facebook" href={`https://www.facebook.com/dialog/share?app_id=${this.state.appId}&display=popup&href=${encodeURIComponent(this.shareUrl())}&redirect_uri=${encodeURIComponent(window.location)}`}></a>
            <a className="twitter-share-button btn --circle  --icon --icon-twitter--white --twitter" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(this.shareUrl())}&text=${this.shareText()}`}></a>
            <button id="copy-session-link" className="btn --secondary --icon --icon-copy--blue" onClick={this.copyToClipboard}>{this.state.copied ? 'Copied!' : 'Copy link'}</button>
          </div>
        </Modal>
      </div>
    );
  }
}

SpotShareContainer.defaultProps = {
  selectedMoment: null,
  spotName: null
};

SpotShareContainer.PropTypes = {
  selectedMoment: PropTypes.object,
  spotName: PropTypes.string
};

export default SpotShareContainer;
