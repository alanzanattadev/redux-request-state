'use babel'
// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import {RequestStateConnecter, RenderedStateConnecter} from '../lib/hoc';

describe('Higher Order Components', () => {
  describe('RequestStateConnecter', () => {
    it('should get state of requestID and pass it as props', () => {
      let MyComponent = (props) => (<div></div>);
      let RequestStateComponent = RequestStateConnecter(props => `user.${props.id}.auth.login`)(MyComponent);
      let subject = mount(<RequestStateComponent requests={{user: {'1': {auth: {login: {state: 'SUCCESS'}}}}}} id="1"/>);

      expect(subject.find(MyComponent).prop('state')).toBe('SUCCESS');
    });

    it('should pass DEFAULT is requestID has no state', () => {
      let MyComponent = (props) => (<div></div>);
      let RequestStateComponent = RequestStateConnecter(props => `user.${props.id}.auth.login`)(MyComponent);
      let subject = mount(<RequestStateComponent requests={{user: {'1': {auth: {login: {state: 'SUCCESS'}}}}}} id="2"/>);

      expect(subject.find(MyComponent).prop('state')).toBe('DEFAULT');
    });
  });

  describe('RenderedStateConnecter', () => {
    it('should select the good state when it exists', () => {
      let MySuccessComponent = (props) => (<div></div>);
      let MyDefaultComponent = (props) => (<div></div>);
      let StatefulComponent = RenderedStateConnecter((state, {}) => state == "SUCCESS" ? <MySuccessComponent/> : <MyDefaultComponent/>, false, false);
      let subject = mount(<StatefulComponent state="SUCCESS"/>);

      expect(subject.find(MySuccessComponent).length).toBe(1);
    });

    it('should display fallback if useFallback is true', () => {
      let MySuccessComponent = (props) => (<div></div>);
      let MyDefaultComponent = (props) => (<div></div>);
      let StatefulComponent = RenderedStateConnecter((state, {}) => state == "SUCCESS" ? <MySuccessComponent/> : <MyDefaultComponent/>, false, true);
      let subject = mount(<StatefulComponent state="ERROR"/>);

      expect(subject.find(MyDefaultComponent).length).toBe(1);
    });

    it('should use cache if useCache is passed', () => {
      let MySuccessComponent = (props) => (<div></div>);
      let MyDefaultComponent = (props) => (<div></div>);
      let StatefulComponent = RenderedStateConnecter((state, {}) => state == "SUCCESS" ? <MySuccessComponent/> : <MyDefaultComponent/>, (props, state) => (state == "DEFAULT" ? true : false), false);
      let subject = mount(<StatefulComponent state="DEFAULT"/>);

      expect(subject.find(MyDefaultComponent).length).toBe(1);
    });
  });
});
