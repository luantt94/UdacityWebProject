import { connect } from "react-redux";
import Question from "./Question";
import { getDoneQuestion, getNotDoneQuestion } from "../utils/helpers";
import "./Dashboard.css";
const Dashboard = (props) => {
  return (
    <div>
      <div className="dashboard">
        <h3 className="center">New Questions</h3>
        <ul className="dashboard-list">
          {props.notDoneQuestions.map((question) => (
            <li key={question.id}>
              <Question question={question} />
            </li>
          ))}
        </ul>
      </div>

      <div className="dashboard">
        <h3 className="center">Done</h3>
        <ul className="dashboard-list">
          {props.doneQuestions.map((question) => (
            <li key={question.id}>
              <Question question={question} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions }) => ({
  doneQuestions: getDoneQuestion(questions, authedUser),
  notDoneQuestions: getNotDoneQuestion(questions, authedUser),
});

export default connect(mapStateToProps)(Dashboard);
