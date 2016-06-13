'use strict'
'use babel'
// @flow weak

jest.unmock('../lib/middleware');

let middleware = require('../lib/middleware');

describe('Middleware', () => {
  describe('Action Handling', () => {
    let next;
    let store;
    let config = {};
    beforeEach(() => {
      next = jest.fn(() => {});
      store = {
        dispatch: jest.fn(() => {

        }),
        getState: jest.fn(() => {

        }),
      };
    });

    it('should handle action well shaped', () => {
      let action = {
        type: "REFRESH_MUSICS",
        requestID: "refreshMusics",
        resolve: () => Promise.resolve(""),
      };
      let test = () => {
        let result = middleware(config)(store)(next)(action);
      };
      expect(test).not.toThrow();
      expect(store.dispatch).toBeCalled();
    });

    it('should handle action badly shaped : missing resolve', () => {
      let action = {
        type: "REFRESH_MUSICS",
        requestID: "refreshMusics",
      };
      let result = middleware(config)(store)(next)(action);
      expect(store.dispatch).not.toBeCalled();
    });

    it('should handle action badly shaped: missing requestID', () => {
      let action = {
        type: "REFRESH_MUSICS",
        resolve: () => Promise.resolve(""),
      };
      let result = middleware(config)(store)(next)(action);
      expect(store.dispatch).not.toBeCalled();
    });

    it('should handle action badly shaped: resolve isn\'t promise', () => {
      let action = {
        type: "REFRESH_MUSICS",
        requestID: "refreshMusics",
        resolve: () => true,
      };
      function test() {
        middleware(config)(store)(next)(action);
      }
      expect(test).toThrow();
    });

    it('should not handle basic actions', () => {
      let action = {
        type: "ADD_TASK",
        payload: {

        }
      };
      middleware(config)(store)(next)(action);
      expect(store.dispatch).not.toBeCalled();
      expect(next).toBeCalled();
    });

    it('should not handle function actions', () => {
      let action = function() {

      };
      middleware(config)(store)(next)(action);
      expect(next).toBeCalled();
      expect(store.dispatch).not.toBeCalled();
    });
  });

  describe('Action Dispatching', () => {
    let next;
    let store;
    let config = {};
    beforeEach(() => {
      next = jest.fn(() => {});
      store = {
        dispatch: jest.fn(() => {

        }),
        getState: jest.fn(() => {

        }),
      };
    });

    it('should dispatch success action', () => {
      return middleware(config)(store)(next)({
        type: "REFRESH_MUSICS",
        requestID: "refreshMusics",
        resolve: () => Promise.resolve("coucou"),
      }).then(() => {
        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[0]).toEqual([{type: "REQUEST_STATE_CHANGED", payload: {requestID: "refreshMusics", state: "PENDING"}}]);
        expect(store.dispatch.mock.calls[1]).toEqual([{type: "REQUEST_STATE_CHANGED", payload: {requestID: "refreshMusics", state: "SUCCESS"}}]);
      });
    });

    it('should dispatch error action', () => {
      return middleware(config)(store)(next)({
        type: "REFRESH_MUSICS",
        requestID: "refreshMusics",
        resolve: () => Promise.reject("salut"),
      }).then(() => {
        expect(store.dispatch.mock.calls.length).toBe(2);
        expect(store.dispatch.mock.calls[0]).toEqual([{type: "REQUEST_STATE_CHANGED", payload: {requestID: "refreshMusics", state: "PENDING"}}]);
        expect(store.dispatch.mock.calls[1]).toEqual([{type: "REQUEST_STATE_CHANGED", payload: {requestID: "refreshMusics", state: "ERROR", error: "salut"}}]);
      });
    });
  });
});
