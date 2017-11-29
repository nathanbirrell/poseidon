import React from 'react';
import Button from 'components/Button';
import Row from 'components/Row';

class GenericErrorMessage extends React.PureComponent {
  render() {
    return (
      <Row withColumn className="text-center">
        <h2>Oops, something went wrong!</h2>

        <Button onClick={this.props.reload}>Try again</Button> <br />

        Or, please <a href="mailto:surfposeidon@gmail.com">let us know</a> if it persists.
      </Row>
    );
  }
};

export default GenericErrorMessage;