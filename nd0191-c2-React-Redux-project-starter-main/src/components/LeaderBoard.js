import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

const LeaderBoard = (props) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Users</th>
            <th scope="col">Answered</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {props.userIds.map((id) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{Object.keys(props.users[id].answers).length}</td>
              <td>{props.users[id].questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
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
