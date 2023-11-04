export const RECEIVE_USERS = "RECEIVE_USERS";
export const USER_VOTE_ANSWER = "USER_VOTE_ANSWER";
export const INSERT_QID_TO_AUTHOR = "INSERT_QID_TO_AUTHOR";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function userVoteAnswer(authedUser, qid, answer) {
  return {
    type: USER_VOTE_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function insertQIdToAuthor(authedUser, qid) {
  return {
    type: INSERT_QID_TO_AUTHOR,
    authedUser,
    qid,
  };
}
