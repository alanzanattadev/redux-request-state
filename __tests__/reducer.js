'use strict'
'use babel'
// @flow weak

jest.unmock('../lib/reducer');
jest.unmock('immutable');

let reducer = require('../lib/reducer');

describe('Reducer', () => {
  it('should handle PENDING state', () => {
    expect(reducer({}, {
      type: "REQUEST_STATE_CHANGED",
      payload: {
        state: "PENDING",
        requestID: "refreshMusics"
      }
    })).toEqual({
      refreshMusics: "PENDING"
    });
  });

  it('should handle SUCCESS state', () => {
    expect(reducer({}, {
      type: "REQUEST_STATE_CHANGED",
      payload: {
        state: "SUCCESS",
        requestID: "refreshMusics"
      }
    })).toEqual({
      refreshMusics: "SUCCESS"
    });
  });

  it('should handle ERROR state', () => {
    expect(reducer({}, {
      type: "REQUEST_STATE_CHANGED",
      payload: {
        state: "ERROR",
        requestID: "refreshMusics",
        error: {
          cause: "Network"
        }
      }
    })).toEqual({
      refreshMusics: "ERROR"
    });
  });

  it('should not handle others actions', () => {
    expect(reducer({}, {
      type: "REFRESH_MUSICS",
      payload: {

      }
    })).toEqual({});
  });

  it('should handle requestID as word list', () => {
    expect(reducer({}, {
      type: "REQUEST_STATE_CHANGED",
      payload: {
        state: "SUCCESS",
        requestID: "musics refresh",
      }
    })).toEqual({
      musics: {
        refresh: "SUCCESS"
      }
    });
  });
});
