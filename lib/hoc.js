"use babel";
// @flow

import React from "react";
import { withContext, getContext, renameProp } from "recompose";
import Types from "prop-types";
import { getStateOfRequestID, getDetailsOfRequestID } from "./selectors";
import type { Routes } from './types';

export const RoutesProvider: (
  component: React$Component,
) => React$Component = withContext(
  {
    LT_routes: Types.any,
  },
  props => ({
    LT_routes: props.routes,
  }),
)(({ children }) => children);

export const WithRoutes = Comp =>
  getContext({
    LT_routes: Types.any,
  })(renameProp("LT_routes", "routes")(Comp));

export function RequestStateConnecter(
  mapPropsToRequestID: (props: any, routes: {[key: string]: Route}) => string,
) {
  return function RequestStateHOC(WrappedComponent) {
    class RequestStateContainer extends React.Component {
      constructor(props) {
        super(props);

        if (props.routes === undefined)
          throw new Error(
            "RequestStateConnecter must receive routes from RoutesProvider, you may have forgotten to declare the RoutesProvider"
          );
      }

      render() {
        if (!this.props.requests)
          throw new Error(
            "RequestStateConnecter must get the reducer requests as props",
          );
        return (
          <WrappedComponent
            {...this.props}
            state={getStateOfRequestID(
              this.props.requests,
              mapPropsToRequestID(this.props, this.props.routes),
            )}
            details={getDetailsOfRequestID(
              this.props.requests,
              mapPropsToRequestID(this.props, this.props.routes),
            )}
          />
        );
      }
    }

    return WithRoutes(RequestStateContainer);
  };
}

export function RenderedStateConnecter(
  mapStateToComponent: (
    state: string,
    props: any,
    details: any,
  ) => React.Element<any>,
  useCache: (props: any, state: string) => boolean | boolean = false,
  useFallback: boolean = true,
) {
  return class RequestStateDependant extends React.Component {
    render() {
      let component;
      if (
        mapStateToComponent("CACHE", this.props, this.props.details) &&
        (typeof useCache == "boolean"
          ? useCache
          : useCache(this.props, this.props.state))
      )
        component = mapStateToComponent(
          "CACHE",
          this.props,
          this.props.details,
        );
      else
        component = mapStateToComponent(
          this.props.state,
          this.props,
          this.props.details,
        );
      if (component == null && useFallback)
        component = mapStateToComponent(
          "DEFAULT",
          this.props,
          this.props.details,
        );
      return component || null;
    }
  };
}
