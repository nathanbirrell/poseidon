import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import { GOOGLE_MAP_URL } from 'lib/GoogleMapsConfig';
const GoogleMapsStyles = require('lib/GoogleMapsStyles.json');

/**
 * This internal component is required for interaction with the
 *    Google Maps API, via `react-google-maps`.
 */
const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    defaultOptions={{ styles: GoogleMapsStyles }}
    className="google-map"
  >
    {props.showMarker && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
));

/**
 * A custom Google Map component for us to place default map styles,
 *    required inline styles, etc.
 */
class PoseidonGoogleMap extends React.PureComponent {
  render() {
    return (
      <Map
        showMarker
        googleMapURL={GOOGLE_MAP_URL}
        lat={parseFloat(this.props.lat)}
        lng={parseFloat(this.props.lng)}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `300px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
};

PoseidonGoogleMap.propTypes = {
  lat: PropTypes.any.isRequired,
  lng: PropTypes.any.isRequired,
};

export default PoseidonGoogleMap;