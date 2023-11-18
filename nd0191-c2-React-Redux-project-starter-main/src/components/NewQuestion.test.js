// import * as React from "react";
import { render } from "@testing-library/react";
import NewQuestion from "./NewQuestion";
import middleware from "../middleware";
import reducer from "../reducers";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { getInitialData } from "../utils/api";
import { act } from "react-dom/test-utils";
import { receiveUsers } from "../actions/users";
import { receiveQuestions } from "../actions/questions";
import { setAuthedUser } from "../actions/authedUser";

const store = createStore(reducer, middleware);

describe("NewQuestion", () => {
  beforeAll(async () => {
    await getInitialData().then((data) =>
      act(() => {
        store.dispatch(receiveUsers(data.users));
        store.dispatch(receiveQuestions(data.questions));
        store.dispatch(setAuthedUser("mtsamis"));
      })
    );
  });

  const component = render(
    <BrowserRouter>
      <Provider store={store}>
        <NewQuestion />
      </Provider>
    </BrowserRouter>
  );
  it("will match snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
