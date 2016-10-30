'use strict'
'use babel'
// @flow weak

let {createStore, applyMiddleware, combineReducers} = require('redux');

describe('Redux integration', () => {
  it('Changes state as expected', () => {
    let store = createStore(combineReducers({requests: require('../lib/reducer')}), applyMiddleware(require('../lib/middleware')()));
    function refreshMusics(artistID) {
      return {
        type: "REFRESH_MUSICS",
        requestID: "music.refresh",
        resolve: () => ({
          then:  (cb) => {
            cb({artistID, musics: ["music1", "music2"]})
            return {catch: () => {}};
          }
        }),
      };
    };
    store.dispatch(refreshMusics("Northlane"));
    expect(store.getState().requests.music.refresh.state).toBe('SUCCESS');
  });
});
