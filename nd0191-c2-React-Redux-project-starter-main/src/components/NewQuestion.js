import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewQuestion = ({ dispatch }) => {
  const navigate = useNavigate();
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
  };

  return (
    <div>
      <h3 className="center">Would You Rather</h3>
      <h4 className="center">Create Your Own Poll</h4>
      <form className="new-question" onSubmit={handleSubmit}>
        <label>First Option</label>
        <br />
        <input
          onChange={handleChange("optionOneText")}
          value={optionOneText}
          type="text"
        ></input>
        <br />
        <label>Second Option</label>
        <br />
        <input
          onChange={handleChange("optionTwoText")}
          value={optionTwoText}
          type="text"
        ></input>
        <br />
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
