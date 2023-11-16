import { connect } from "react-redux";
// import Question from "./Question";
// import NewQuestion from "./NewQuestion ";
import { handleVoteOption } from "../actions/questions";
import { getQuestionStatus } from "../utils/helpers";
import { userVoteAnswer } from "../actions/users";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  useEffect(() => {
    if (props.authedUser == "") {
      props.router.navigate("/login");
    }
  }, []);

  const selectOption = (e, answer) => {
    e.preventDefault();
    const { dispatch } = props;
    dispatch(handleVoteOption(props.authedUser, props.id, answer));
    dispatch(userVoteAnswer(props.authedUser, props.id, answer));
  };
  return (
    <div>
      <h1>Poll by {props.users[props.question.author].name}</h1>
      <img src={"/" + props.users[props.question.author].avatarURL} />
      <h1>{props.question.optionOne}</h1>
      <button
        onClick={(e) => selectOption(e, "optionOne")}
        disabled={props.question.isDone}
      >
        Click
      </button>
      <h1>{props.question.optionTwo}</h1>
      <button
        onClick={(e) => selectOption(e, "optionTwo")}
        disabled={props.question.isDone}
      >
        Click
      </button>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;

  return {
    id,
    authedUser,
    question: getQuestionStatus(questions, authedUser, id),
    users,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
