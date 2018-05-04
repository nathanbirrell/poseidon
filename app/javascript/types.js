import { apiActionTypes } from 'lib/ReduxUtils';

/**
 * Action types (WIP)
 *
 *    Some conventions to follow:
 *      - all caps, undercores to space words, as these are constants
 *      - group related actions in an object (ie our apiActionTypes util)
 *      - template: {VERB}_{ITEM_NAME}.{ACTION}. For example: FETCH_SPOTS_SUCCESS
 *      - verbs: FETCH (get), SAVE (post/put)
 *      - actions: can be anything, but commonly a part of sequence in API call (REQUEST/SUCCESS/FAIL)
 */

export const FETCH_SPOT_LIST = apiActionTypes('FETCH_SPOT_LIST');

export const FETCH_SPOT = apiActionTypes('FETCH_SPOT');

export const FETCH_SURF_FORECAST = apiActionTypes('FETCH_SURF_FORECAST');

export const CHANGE_SELECTED_DATETIME = 'CHANGE_SELECTED_DATETIME';