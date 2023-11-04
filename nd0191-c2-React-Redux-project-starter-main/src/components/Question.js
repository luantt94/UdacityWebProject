import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import "./Question.css";
const Question = (props) => {
  const navigate = useNavigate();

  const showDetail = (e, id) => {
    e.preventDefault();

    navigate(`/question/${id}`);
  };

  return (
    <div>
      {props.question.author}
      <div>{formatDate(props.question.timestamp)}</div>
      <button
        className="btn-quesion"
        onClick={(e) => showDetail(e, props.question.id)}
      >
        Show
      </button>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { question }) => {
  return {
    question: question ? formatQuestion(question) : null,
  };
};

export default connect(mapStateToProps)(Question);
