export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function formatQuestion(question) {
  const { id, author, timestamp } = question;

  return {
    id,
    author,
    timestamp,
  };
}

export function getQuestionStatus(questions, authedUser, questionId) {
  const isDone =
    questions[questionId].optionOne.votes.includes(authedUser) ||
    questions[questionId].optionTwo.votes.includes(authedUser);
  return {
    isDone,
    author: questions[questionId].author,
    optionOne: questions[questionId].optionOne.text,
    optionTwo: questions[questionId].optionTwo.text,
  };
}

export function getDoneQuestion(questions, authedUser) {
  return Object.values(questions).filter(
    (question) =>
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
  );
}

export function getNotDoneQuestion(questions, authedUser) {
  return Object.values(questions).filter(
    (question) =>
      !question.optionOne.votes.includes(authedUser) &&
      !question.optionTwo.votes.includes(authedUser)
  );
}
