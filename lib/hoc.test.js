'use babel'
// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import {RequestStateConnecter, RenderedStateConnecter, RoutesProvider} from './hoc';

describe('Higher Order Components', () => {
  describe('RequestStateConnecter', () => {
    it('should get state of requestID and pass it as props', () => {
      let MyComponent = (props) => (<div></div>);
      let RequestStateComponent = RequestStateConnecter(props => `user.${props.id}.auth.login`)(MyComponent);
      let subject = mount(
        <RoutesProvider routes={{}}>
          <RequestStateComponent requests={{user: {'1': {auth: {login: {state: 'SUCCESS'}}}}}} id="1"/>
        </RoutesProvider>
      );

      expect(subject.find(MyComponent).prop('state')).toBe('SUCCESS');
    });

    it('should pass DEFAULT if requestID has no state', () => {
      let MyComponent = (props) => (<div></div>);
      let RequestStateComponent = RequestStateConnecter(props => `user.${props.id}.auth.login`)(MyComponent);
      let subject = mount(
        <RoutesProvider routes={{}}>
          <RequestStateComponent requests={{user: {'1': {auth: {login: {state: 'SUCCESS'}}}}}} id="2"/>
        </RoutesProvider>
      );

      expect(subject.find(MyComponent).prop('state')).toBe('DEFAULT');
    });

    it('should pass data as details props if request has succeed', () => {
      let MyComponent = (props) => (<div></div>);
      let RequestStateComponent = RequestStateConnecter(props => `user.${props.id}.auth.login`)(MyComponent);
      let subject = mount(
        <RoutesProvider routes={{}}>
          <RequestStateComponent requests={{user: {'1': {auth: {login: {state: 'SUCCESS', data: {message: "perfect"}}}}}}} id="1"/>
        </RoutesProvider>
      );

      expect(subject.find(MyComponent).prop('details')).toEqual({message: 'perfect'});
    });

    it('should pass errors details as details props if request has failed', () => {
      let MyComponent = (props) => (<div></div>);
      let RequestStateComponent = RequestStateConnecter(props => `user.${props.id}.auth.login`)(MyComponent);
      let subject = mount(
        <RoutesProvider routes={{}}>
          <RequestStateComponent requests={{user: {'1': {auth: {login: {state: 'ERROR', error: {code: 401}}}}}}} id="1"/>
        </RoutesProvider>
      );

      expect(subject.find(MyComponent).prop('details')).toEqual({code: 401});
    });
  });

  describe('RenderedStateConnecter', () => {
    it('should select the good state when it exists', () => {
      let MySuccessComponent = (props) => (<div></div>);
      let MyDefaultComponent = (props) => (<div></div>);
      let StatefulComponent = RenderedStateConnecter((state, {}) => state == "SUCCESS" ? <MySuccessComponent/> : <MyDefaultComponent/>, false, false);
      let subject = mount(
        <RoutesProvider routes={{}}>
          <StatefulComponent state="SUCCESS"/>
        </RoutesProvider>
      );

      expect(subject.find(MySuccessComponent).length).toBe(1);
    });

    it('should display fallback if useFallback is true', () => {
      let MySuccessComponent = (props) => (<div></div>);
      let MyDefaultComponent = (props) => (<div></div>);
      let StatefulComponent = RenderedStateConnecter((state, {}) => state == "SUCCESS" ? <MySuccessComponent/> : <MyDefaultComponent/>, false, true);
      let subject = mount(
        <RoutesProvider routes={{}}>
          <StatefulComponent state="ERROR"/>
        </RoutesProvider>
      );

      expect(subject.find(MyDefaultComponent).length).toBe(1);
    });

    it('should use cache if useCache is passed', () => {
      let MySuccessComponent = (props) => (<div></div>);
      let MyDefaultComponent = (props) => (<div></div>);
      let StatefulComponent = RenderedStateConnecter((state, {}) => state == "SUCCESS" ? <MySuccessComponent/> : <MyDefaultComponent/>, (props, state) => (state == "DEFAULT" ? true : false), false);
      let subject = mount(
        <RoutesProvider routes={{}}>
          <StatefulComponent state="DEFAULT"/>
        </RoutesProvider>
      );

      expect(subject.find(MyDefaultComponent).length).toBe(1);
    });
  });
});
