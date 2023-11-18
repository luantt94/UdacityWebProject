import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("should return the saved question with all expected fields populated", async () => {
    const question = {
      optionOneText: "a",
      optionTwoText: "b",
      author: "sarahedo",
    };
    const result = {
      author: question.author,
      optionOne: {
        text: question.optionOneText,
      },
      optionTwo: {
        text: question.optionTwoText,
      },
    };
    await expect(_saveQuestion(question)).resolves.toMatchObject(result);
  });

  it("should return the error if incorrect data is passed", async () => {
    await expect(_saveQuestion({})).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should save the question answer", async () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    await expect(
      _saveQuestionAnswer({ authedUser, qid, answer })
    ).resolves.toBe(true);
  });

  it("will return an error if incorrect data is passed", async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
