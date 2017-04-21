"use babel";
// @flow

import Route from "./Route";

describe("Route", () => {
  it("should get request ID correctly", () => {
    let subject = new Route({
      requestIDFactory: (user, photoID) => `user.${user.id}.photo.${photoID}`,
    });

    expect(subject.getRequestID({ id: "2" }, "myphoto")).toBe(
      "user.2.photo.myphoto",
    );
  });

  it("should create action correctly", (done) => {
    let request = new Route({
      requestIDFactory: (user, photoID) => `user.${user.id}.photo.${photoID}`,
      type: "MY_REQUEST",
      resolve: (user, photoID) =>
        Promise.resolve({ id: user.id, photoID: photoID }),
      replayWith: response => ({ type: "PONG" }),
    });
    let subject = request.create({ id: "1" }, "myphoto");

    expect(subject).toMatchSnapshot();
    subject.resolve().then((response) => {
      expect(response).toMatchSnapshot();
      done();
    })
  });
});
