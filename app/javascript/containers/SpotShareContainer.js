import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import clipboard from 'clipboard';
import { Route } from 'react-router-dom';

class SpotShareContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      shareOpen: false,
      appId: 321161578347645,
    };

    this.initClipboard = this.initClipboard.bind(this);
    this.handleShareOpen = this.handleShareOpen.bind(this);
    this.handleShareClose = this.handleShareClose.bind(this);
  }

  componentDidMount() {
    this.initClipboard();
  }

  initClipboard() {
    const clipboard = new Clipboard('#share-session');
    clipboard.on('success', e => {
      this.setState({
        copied: true,
      });
    });}

  handleShareOpen() {
    this.setState({
      shareOpen: true
    });
  }

  handleShareClose() {
    this.setState({
      shareOpen: false
    });
  }

  shareText() {
    return encodeURIComponent(`Check out ${this.props.spotName} at ${this.props.selectedMoment.format('ha, dddd Do MMM')}`);
  }

  shareUrl() {
    const output = `${[location.protocol, '//', location.host, location.pathname].join('')}?date_time=${this.props.selectedMoment.format()}`;
    return output;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="columns">
            <button className="btn --icon --icon-share-2--white" onClick={this.handleShareOpen}>Share session</button>
          </div>
        </div>

        {this.state.shareOpen ?
          <div>
            <div className="curtain -light" onClick={this.handleShareClose}></div>
            <div className="share-menu">
              <div className="share-menu__header">
                Share session
                <a onClick={this.handleShareClose}>X</a>
              </div>
              <div className="share-menu__body">
                <p><strong>{this.props.spotName}</strong> @ <strong>{this.props.selectedMoment.format('ha, dddd Do MMM')}</strong></p>
                <button id="share-session" className="btn --circle --icon --icon-copy--white" data-clipboard-text={`${this.shareUrl()}`}></button>
                <a className="btn --circle  --icon --icon-message-circle--white" href={`fb-messenger://share/?link=${encodeURIComponent(this.shareUrl())}&app_id=${this.state.appId}`}></a>
                <a className="btn --circle  --icon --icon-facebook--white" href={`https://www.facebook.com/dialog/share?app_id=${this.state.appId}&display=popup&href=${encodeURIComponent(this.shareUrl())}&redirect_uri=${encodeURIComponent(window.location)}`}></a>
                <a className="twitter-share-button btn --circle  --icon --icon-twitter--white" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(this.shareUrl())}&text=${this.shareText()}`}></a>
              </div>
            </div>
          </div>
        : null }
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
