import momentConfig from 'config/MomentConfig';
import bluebirdConfig from 'config/BluebirdConfig';

export const API_BASE_URL = window.location.origin;
export const API_BASE_HEADERS = [];

export default function () {
  momentConfig();
  bluebirdConfig();
}