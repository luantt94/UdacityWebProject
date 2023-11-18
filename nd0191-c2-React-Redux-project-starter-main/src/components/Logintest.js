import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import middleware from "../middleware";
import reducer from "../reducers";
import { getInitialData } from "../utils/api";
import { receiveUsers } from "../actions/users";
import { Router } from "react-router-dom";

import { act } from "react-dom/test-utils";
import Login from "./Login";

const store = createStore(reducer, middleware);

describe("Login", () => {
  beforeAll(async () => {
    await getInitialData().then((data) =>
      act(() => {
        store.dispatch(receiveUsers(data.users));
      })
    );
  });

  it("Will contain an input type image for each user", async () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const input1 = component.getByTestId("sarahedo");
    const input2 = component.getByTestId("tylermcginnis");
    const input3 = component.getByTestId("mtsamis");
    const input4 = component.getByTestId("zoshikanlu");
    await waitFor(() => expect(input1).toBeInTheDocument());
    await waitFor(() => expect(input2).toBeInTheDocument());
    await waitFor(() => expect(input3).toBeInTheDocument());
    await waitFor(() => expect(input4).toBeInTheDocument());
  });

  it("will set authorized user on input click", async () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const input1 = component.getByTestId("sarahedo");
    fireEvent.click(input1);
    await waitFor(() => expect(store.authedUser === "sarahedo"));
  });
});
