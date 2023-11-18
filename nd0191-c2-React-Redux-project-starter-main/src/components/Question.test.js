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
import Question from "./Question";

const store = createStore(reducer, middleware);

describe("Question", () => {
  const question = { id: "11", author: "abc", timestamp: "aaa" };

  it("Will contain an input type image for each user", async () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Question question={question} />
        </BrowserRouter>
      </Provider>
    );

    var labels = component.getAllByText("Show");
    expect(labels.length).toEqual(1);
  });
});
