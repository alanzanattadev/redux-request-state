"use babel";
// @flow

import type { ResolveResult } from "./types.js";
import type { ResolveFn } from "./types.js";
import type { ReplayWithFn } from "./types.js";
import type { RequestIDFactory } from "./types.js";
import type { RequestAction } from "./types.js";

export default class Route {
  type: string;
  resolve: ResolveFn;
  replayWith: ?ReplayWithFn;
  requestIDFactory: RequestIDFactory;
  constructor(
    {
      type = "REQUEST",
      resolve = () => Promise.resolve(null),
      replayWith = null,
      requestIDFactory,
    }: {
      type: string,
      resolve: ResolveFn,
      replayWith: ?ReplayWithFn,
      requestIDFactory: RequestIDFactory,
    } = {},
  ) {
    if (typeof requestIDFactory !== "function")
      throw new Error(
        "You have to define a requestIDFactory attribut to the Route constructor: (...params) => string",
      );
    this.type = type;
    this.resolve = resolve;
    this.replayWith = replayWith;
    this.requestIDFactory = requestIDFactory;
  }

  getRequestID(...params: Array<any>): string {
    return this.requestIDFactory(...params);
  }

  create(...params: Array<any>): RequestAction {
    return {
      type: this.type,
      resolve: () => this.resolve(...params),
      replayWith: this.replayWith,
      requestID: this.requestIDFactory(...params),
    };
  }

  createAndInject(resolver: ResolveResult, ...params: Array<any>): RequestAction {
    return {
      type: this.type,
      resolve: () => resolver,
      replayWith: this.replayWith,
      requestID: this.requestIDFactory(...params),
    };
  }
}
