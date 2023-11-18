import { fireEvent, render, waitFor } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import middleware from "../middleware";
import reducer from "../reducers";
import { getInitialData } from "../utils/api";
import { receiveUsers } from "../actions/users";
import { BrowserRouter } from "react-router-dom";
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
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    var labels = component.getAllByText("Login as");
    expect(labels.length).toEqual(1);
  });

  it("will set authorized user on input click", async () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    const input1 = component.getByTestId("btnLogin");
    fireEvent.click(input1);
    await waitFor(() => expect(store.authedUser === "sarahedo"));
  });
});
