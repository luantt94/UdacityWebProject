import questions from "../reducers/questions";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { insertQIdToAuthor } from "./users";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const VOTE_QUESTION_ANSWER = "VOTE_QUESTION_ANSWER";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function voteQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: VOTE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleVoteOption(authedUser, qid, answer) {
  saveQuestionAnswer({ authedUser, qid, answer });
  return (dispatch) => {
    return dispatch(voteQuestionAnswer({ authedUser, qid, answer }));
  };

  // return (dispatch) => {
  //   dispatch(showLoading());

  //   return saveQuestionAnswer({ authedUser, qid, answer })
  //     .then((question) =>
  //       dispatch(voteQuestionAnswer({ authedUser, qid, answer }))
  //     )
  //     .then(() => dispatch(hideLoading()));
  // };
}

export function handleAddQuestion(values) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    return saveQuestion({
      optionOneText: values.optionOneText,
      optionTwoText: values.optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(insertQIdToAuthor(question.author, question.id));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
