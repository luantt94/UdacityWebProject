import questions from "../reducers/questions";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
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
    console.log("calling action dispatch handleVoteOption");
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

export function handleAddQuestion(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      text,
      author: authedUser,
      replyingTo,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
