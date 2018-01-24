
// TODO: move to constants.js
export const SPOTS_UPDATE = 'SPOTS_UPDATE';
export const SPOTS_SYNC_REQUEST = 'SPOTS_SYNC_REQUEST';
export const SPOTS_SYNC_FAILED = 'SPOTS_SYNC_FAILED';

export const syncSpots = () => {
  return {
    type: SPOTS_SYNC_REQUEST,
  };
};