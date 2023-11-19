import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NewQuestion = ({ dispatch }) => {
  const user = useSelector((state) => state.authedUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user == "") {
      navigate("/login");
    }
  }, []);

  const [values, setValues] = useState({
    optionOneText: "",
    optionTwoText: "",
  });
  const { optionOneText, optionTwoText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddQuestion(values));

    setValues({ ...values, optionOneText: "", optionTwoText: "" });
    navigate("/");
  };

  return (
    <div>
      <h3 className="center">Would You Rather</h3>
      <h4 className="center">Create Your Own Poll</h4>
      <form className="new-question" onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col>
              <label>First Option</label>
            </Col>
            <Col>
              <label>Second Option</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                onChange={handleChange("optionOneText")}
                value={optionOneText}
                type="text"
              ></input>
            </Col>
            <Col>
              <input
                onChange={handleChange("optionTwoText")}
                value={optionTwoText}
                type="text"
              ></input>
            </Col>
          </Row>
        </Container>
        <button
          className="btn"
          type="submit"
          disabled={optionOneText === "" || optionTwoText === ""}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(NewQuestion);
