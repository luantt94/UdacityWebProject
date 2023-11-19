import { connect } from "react-redux";
import Question from "./Question";
import { getDoneQuestion, getNotDoneQuestion } from "../utils/helpers";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [isToggle, setIsToggle] = useState(true);
  const toggleChange = () => {
    setIsToggle(!isToggle);
  };
  useEffect(() => {
    if (props.authedUser == "") {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <input
        type="radio"
        value={true}
        name="toggle"
        checked={isToggle}
        onChange={toggleChange}
      />
      <label>unanswered polls</label>
      <input type="radio" value={false} name="toggle" onChange={toggleChange} />
      <label>answered polls</label>
      {isToggle ? (
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
      ) : (
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
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions }) => {
  // Convert the questions object into an array
  const questionsArray = Object.values(questions);
  questionsArray.sort((a, b) => b.timestamp - a.timestamp);
  // Convert the sorted array back into an object
  const sortedQuestions = questionsArray.reduce((acc, question) => {
    acc[question.id] = question;
    return acc;
  }, {});
  return {
    doneQuestions: getDoneQuestion(sortedQuestions, authedUser),
    notDoneQuestions: getNotDoneQuestion(sortedQuestions, authedUser),
    authedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
