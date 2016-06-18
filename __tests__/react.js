'use strict'
'use babel'
// @flow weak

jest.unmock('../lib/react');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import RequestStateConnecter from '../lib/react';

describe('React request state connecter', () => {
  describe('with mapStateToComponent and mapRequestIDToProps as objects', () => {
    let SuccessComponent = React.createClass({render: () => null});
    let LoadingComponent = React.createClass({render: () => null});
    let ErrorComponent = React.createClass({render: () => null});
    let StateContainer = RequestStateConnecter('data.fetch', {
      mapStateToComponent: {
        'PENDING': (<LoadingComponent myProp="test"/>),
        'SUCCESS': (<SuccessComponent/>),
        'ERROR': (<ErrorComponent/>),
        'DEFAULT': (<LoadingComponent/>),
        'CACHE': (<SuccessComponent/>)
      },
      mapRequestIDToProps: {
        'data.fetch': {
          download: true
        }
      },
      useCache: (props, state) => {
        if (props.data && props.data.length > 0 && state == "PENDING")
          return true;
        else
          return false;
      }
    }, {});
    it('should render the spinner', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'PENDING'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, LoadingComponent)).toBeDefined();
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, LoadingComponent).props.myProp).toBe('test');
    });

    it('should render the error', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'ERROR'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, ErrorComponent)).toBeDefined();
    });

    it('should render the success', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'SUCCESS'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, SuccessComponent)).toBeDefined();
    });

    it('should add props for fetch request', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'PENDING'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, LoadingComponent).props.download).toBe(true);
    });

    it('should render default component', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            upload: {
              state: 'PENDING'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, LoadingComponent)).toBeDefined();
    });

    it('should render null', () => {
      let renderer = TestUtils.createRenderer();
      renderer.render(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'UNKNOWN STATE'
            }
          }
        }}/>
      );
      expect(renderer.getRenderOutput()).toBe(null);
    });

    it('should use cache', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'SUCCESS'
            }
          }
        }} data={["myData"]}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, SuccessComponent)).toBeDefined();
    });
  });

  describe('with mapStateToComponents and mapRequestIDToProps as functions', () => {
    let SuccessComponent = React.createClass({render: () => null});
    let LoadingComponent = React.createClass({render: () => null});
    let ErrorComponent = React.createClass({render: () => null});
    let StateContainer = RequestStateConnecter('data.fetch', {
      mapStateToComponent: (state) => ({
        'PENDING': (<LoadingComponent/>),
        'SUCCESS': (<SuccessComponent/>),
        'ERROR': (<ErrorComponent/>),
        'DEFAULT': (<LoadingComponent/>)
      }[state]),
      mapRequestIDToProps: (reqID) => ({
        'data.fetch': {
          download: true
        }
      }[reqID])
    }, {});
    it('should render the spinner', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'PENDING'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, LoadingComponent)).toBeDefined();
    });

    it('should render the error', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'ERROR'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, ErrorComponent)).toBeDefined();
    });

    it('should render the success', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'SUCCESS'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, SuccessComponent)).toBeDefined();
    });

    it('should add props for fetch request', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'PENDING'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, LoadingComponent).props.download).toBe(true);
    });

    it('should render default component', () => {
      const ConnectedComponent = TestUtils.renderIntoDocument(
        <StateContainer reducer={{
          data: {
            upload: {
              state: 'PENDING'
            }
          }
        }}/>
      );
      expect(TestUtils.findRenderedComponentWithType(ConnectedComponent, LoadingComponent)).toBeDefined();
    });

    it('should render null', () => {
      let renderer = TestUtils.createRenderer();
      renderer.render(
        <StateContainer reducer={{
          data: {
            fetch: {
              state: 'UNKNOWN STATE'
            }
          }
        }}/>
      );
      expect(renderer.getRenderOutput()).toBe(null);
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined mapRequestIDToProps', () => {
      let StateContainer = RequestStateConnecter('data.fetch', {mapStateToComponent: {}});
      expect(() => {
        TestUtils.renderIntoDocument(
          <StateContainer reducer={{
            data: {
              upload: {
                state: 'PENDING'
              }
            }
          }}/>
        );
      }).not.toThrow();
    });

    it('should throws when mapStateToComponents is undefined', () => {
      let StateContainer = RequestStateConnecter('data.fetch');
      expect(() => {
        TestUtils.renderIntoDocument(
          <StateContainer reducer={{
            data: {
              upload: {
                state: 'PENDING'
              }
            }
          }}/>
        );
      }).toThrow();
    });
  });
});
