import * as React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Nav from "./Nav";
import middleware from "../middleware";
import reducer from "../reducers";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { getInitialData } from "../utils/api";
import { act } from "react-dom/test-utils";
import { receiveUsers } from "../actions/users";
import { receiveQuestions } from "../actions/questions";
import { setAuthedUser } from "../actions/authedUser";

const store = createStore(reducer, middleware);
describe("Nav", () => {
  beforeAll(async () => {
    await getInitialData().then((data) =>
      act(() => {
        store.dispatch(receiveUsers(data.users));
        store.dispatch(receiveQuestions(data.questions));
        store.dispatch(setAuthedUser("mtsamis"));
      })
    );
  });
  it("will match snapshot", () => {
    const component = render(
      <BrowserRouter>
        <Provider store={store}>
          <Nav />
        </Provider>
      </BrowserRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
