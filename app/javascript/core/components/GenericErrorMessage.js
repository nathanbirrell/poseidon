import React from 'react';
import Button from 'components/Button';
import Row from 'components/Row';
import Icon from 'components/Icon';

class GenericErrorMessage extends React.PureComponent {
  render() {
    return (
      <Row withColumn className="text-center">
        <Icon name="alert-triangle" size={Icon.Size.MASSIVE} />

        <h2>Oops, something went wrong!</h2>

        <Button onClick={this.props.reload} style={{ marginRight: 0 }}>Try again</Button> <br />

        Or, please <a href="mailto:surfposeidon@gmail.com">let us know</a> if it persists.
      </Row>
    );
  }
};

export default GenericErrorMessage;