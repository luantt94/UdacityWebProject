import { connect } from "react-redux";
// import Question from "./Question";
// import NewQuestion from "./NewQuestion ";
import { handleVoteOption } from "../actions/questions";
import { getQuestionStatus } from "../utils/helpers";
import { userVoteAnswer } from "../actions/users";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Page404 from "./Page404";

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
      {props.id == "" ? (
        <Page404 />
      ) : (
        <>
          <div align="center">
            <h1>Poll by {props.users[props.question.author].name}</h1>
            <img src={"/" + props.users[props.question.author].avatarURL} />
          </div>

          <Container>
            <Row>
              <Col>
                <h1>{props.question.optionOne}</h1>
              </Col>
              <Col>
                <h1>{props.question.optionTwo}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Number of votes: {props.question.voteForOne}</h3>
                <h3>
                  {Math.round(
                    (props.question.voteForOne * 100) /
                      (props.question.voteForOne + props.question.voteForTwo)
                  )}
                  % of people voted for this option.
                </h3>
              </Col>
              <Col>
                <h3>Number of votes: {props.question.voteForTwo}</h3>
                <h3>
                  {100 -
                    Math.round(
                      (props.question.voteForOne * 100) /
                        (props.question.voteForOne + props.question.voteForTwo)
                    )}
                  % of people voted for this option.
                </h3>
              </Col>
            </Row>
            <Row>
              <Col>
                {props.question.isDone ? (
                  <></>
                ) : (
                  <button onClick={(e) => selectOption(e, "optionOne")}>
                    Vote for Option 1
                  </button>
                )}

                {props.question.userVoteForOne.includes(props.authedUser) ? (
                  <>
                    <h2 style={{ backgroundColor: "#FF0000" }}>
                      You are voted for this option
                    </h2>
                  </>
                ) : (
                  <></>
                )}
              </Col>
              <Col>
                {props.question.isDone ? (
                  <></>
                ) : (
                  <button onClick={(e) => selectOption(e, "optionTwo")}>
                    Vote for Option 2
                  </button>
                )}
                {props.question.userVoteForTwo.includes(props.authedUser) ? (
                  <>
                    <h2 style={{ backgroundColor: "#FF0000" }}>
                      You are voted for this option
                    </h2>
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;
  if (!questions.hasOwnProperty(id)) {
    return {
      id: "",
    };
  }
  return {
    id,
    authedUser,
    question: getQuestionStatus(questions, authedUser, id),
    users,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
