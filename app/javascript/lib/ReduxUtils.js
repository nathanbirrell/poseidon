import Promise from 'bluebird';
import StringUtils from 'lib/StringUtils';

/*
 * Generates a substore for generic API sync style data
 * */
export const apiSubstore = (apiName, initialData = null) => {
  return {
    [`async${StringUtils.capitalise(apiName)}`]: {
      isSyncing: false,
      syncError: null,
      data: initialData,
      lastUpdated: 0,
    },
  };
};

/*
 * Action to take to sync data to an API
 * Used in action.js files
 * */
export const apiSyncAction = (dispatch, constants, syncFunc, skip) => {
  if (skip) { return new Promise((resolve) => resolve(null)); }

  dispatch({ type: constants.REQUEST });

  return new Promise((resolve, reject, onCancel) => {
    const req = syncFunc()
      .then(data => {
        if (constants.SUCCESS) {
          dispatch({
            type: constants.SUCCESS,
            data,
          });
        }
        resolve(data);
        return data;
      })
      .catch((error) => {
        dispatch({
          type: constants.FAIL,
          error,
        });
        reject(error);
        return error;
      });

    // TODO: remove me, we should provide onCancel for all promises fam
    if (!onCancel) { return; }
    onCancel(() => {
      if (req && req.cancel) { req.cancel(); }
      return null;
    });
  });
};

/*
 * The store update actions that are run
 *
 * `substoreParents` cater for substores that are wrapped inside a parent object
 * This implementation caters for N-level deep nesting.
 * e.g. for a reducer state that has a structure of:
 *
 *  initialState = {
 *    apiSet1: {
 *      apiSubset1: {
 *        ...,
 *      },
 *      apiSubset2: {
 *        apiSubSubset1: {
 *          ...ReduxUtils.apiReducerUpdate(action.data, 'vitalApi'),
 *        }
 *      },
 *    },
 *  };
 *
 *  the function will be called in the following pattern to update `vitalApi`:
 *
 *  ReduxUtils.apiReducerUpdate(action.data, 'vitalApi', ['apiSet1', 'apiSubset2', 'apiSubSubset1'])
 *
 * */
const apiReducerGenerator = (_updateAction, apiName, substoreParents) => {
  const apiNameTitle = StringUtils.capitalise(apiName);

  let updateAction = {
    [`async${apiNameTitle}`]: _updateAction,
  };

  // Nest the action inside its parents if any is defined
  if (substoreParents) {
    substoreParents.reverse().forEach(substoreParent => {
      updateAction = { [substoreParent]: updateAction };
    });
  }

  return updateAction;
};

export const apiReducerUpdate = (data, ...args) => {
  const updateAction = {
    isSyncing: { $set: false },
    data: { $set: data },
    lastUpdated: { $set: (new Date()).getTime() },
  };

  return apiReducerGenerator(updateAction, ...args);
};

export const apiReducerSyncRequest = (...args) => {
  const updateAction = {
    isSyncing: { $set: true },
    syncError: { $set: null },
  };

  return apiReducerGenerator(updateAction, ...args);
};

export const apiReducerSyncFailed = (error, ...args) => {
  const updateAction = {
    isSyncing: { $set: false },
    syncError: { $set: error },
  };

  return apiReducerGenerator(updateAction, ...args);
};

/*
 * Generates an object of constants for request/success/fail states
 * */
export const apiActionTypes = (actionName) => {
  return {
    REQUEST: `${actionName.toUpperCase()}_REQUEST`,
    SUCCESS: `${actionName.toUpperCase()}_SUCCESS`,
    FAIL: `${actionName.toUpperCase()}_FAIL`,
  };
};