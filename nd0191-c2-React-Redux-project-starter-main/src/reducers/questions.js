import { RECEIVE_QUESTIONS, VOTE_QUESTION_ANSWER } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case VOTE_QUESTION_ANSWER:
      console.log("Stateeeeee");
      console.log(state);
      console.log("Actionnnnnnnn");
      console.log(action);
      // const s = {
      //   ...state,
      //   [action.qid]: {
      //     ...state[action.qid],
      //     [action.answer]: {
      //       ...state[action.qid][action.answer],
      //       votes: state[action.qid][action.answer].votes.concat([
      //         action.authedUser,
      //       ]),
      //     },
      //   },
      // };
      // console.log("ssssssss");
      // console.log(s);

      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };
    default:
      return state;
  }
}
