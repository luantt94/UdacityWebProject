import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const LeaderBoard = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      {props.userIds.map((id) => (
        <li key={id}>
          <h1>{id}</h1>
          <h1>answer {Object.keys(props.users[id].answers).length}</h1>
          <h1>question {props.users[id].questions.length}</h1>
        </li>
      ))}
    </div>
  );
};

// Comparison function to sort users by score
const compareUsers = (user1, user2) => {
  return user2.questions.length - user1.questions.length;
};

const mapStateToProps = ({ users }) => ({
  userIds: Object.keys(users).sort(
    (a, b) => users[b].questions.length - users[a].questions.length
  ),
  users,
});

export default connect(mapStateToProps)(LeaderBoard);
