'use strict'
'use babel'
// @flow weak

let reducer = require('../lib/reducer');

describe('Reducer', () => {
  it('should handle PENDING state', () => {
    expect(reducer({}, {
      type: "REQUEST_STATE_CHANGED",
      payload: {
        state: "PENDING",
        requestID: "refreshMusics",
        params: {
          token: "mytoken"
        }
      }
    })).toEqual({
      refreshMusics: {state: "PENDING", params: {token: "mytoken"}}
    });
  });

  it('should handle SUCCESS state', () => {
    expect(reducer({}, {
      type: "REQUEST_STATE_CHANGED",
      payload: {
        state: "SUCCESS",
        requestID: "refreshMusics",
        data: ["myData"],
        params: {token: "mytoken"}
      }
    })).toEqual({
      refreshMusics: {state: "SUCCESS", data: ["myData"], params: {token: "mytoken"}}
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
        },
        params: {
          token: "mytoken"
        }
      }
    })).toEqual({
      refreshMusics: {state: "ERROR", error: {cause: "Network"}, params: {token: "mytoken"}}
    });
  });

  it('should not handle others actions', () => {
    expect(reducer({}, {
      type: "REFRESH_MUSICS",
      payload: {

      }
    })).toEqual({});
  });

  it('should handle requestID as namespace list', () => {
    expect(reducer({}, {
      type: "REQUEST_STATE_CHANGED",
      payload: {
        state: "SUCCESS",
        requestID: "musics.refresh",
      }
    })).toEqual({
      musics: {
        refresh: {state: "SUCCESS"}
      }
    });
  });
});
