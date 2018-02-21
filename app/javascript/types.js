import { apiActionTypes } from 'lib/ReduxUtils';

/**
 * Action types (WIP)
 *
 *    Some conventions to follow:
 *      - all caps, undercores to space words, as these are constants
 *      - template: {VERB}_{ITEM_NAME}.{ACTION}. For example: FETCH_SPOTS_SUCCESS
 *      - verbs: FETCH (get), SAVE (post/put)
 *      - actions: can be anything, but commonly a part of sequence in API call (REQUEST/SUCCESS/FAIL)
 */

export const FETCH_SPOT_LIST = apiActionTypes('FETCH_SPOT_LIST');
console.log(FETCH_SPOT_LIST);

export const FETCH_SPOT_REQUEST = 'FETCH_SPOT_REQUEST';
export const FETCH_SPOT_SUCCESS = 'FETCH_SPOT_SUCCESS';
export const FETCH_SPOT_ERROR = 'FETCH_SPOT_ERROR';

export const FETCH_SURF_FORECAST_REQUEST = 'FETCH_SURF_FORECAST_REQUEST';
export const FETCH_SURF_FORECAST_SUCCESS = 'FETCH_SURF_FORECAST_SUCCESS';
export const FETCH_SURF_FORECAST_ERROR = 'FETCH_SURF_FORECAST_ERROR';

export const CHANGE_SELECTED_DATETIME = 'CHANGE_SELECTED_DATETIME';