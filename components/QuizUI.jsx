"use client";

import { useEffect, useState } from "react";

/**
 *
 * @param {{questions: import("@prisma/client").Card[]}} param0
 */
export default function QuizUI({ questions }) {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [currAnswer, setCurrAnswer] = useState("");
  const [score, setScore] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [complete, setComplete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (currQuestion === questions.length - 1) {
      setComplete(true);
      return;
    }
    if (currAnswer === "") {
      setError("Enter an answer before submitting");
      setLoading(false);
      return;
    }
    const inp = document.getElementById("answer");
    if (
      questions[currQuestion].answer.toLowerCase() === currAnswer.toLowerCase()
    ) {
      setScore(score + 1);
      setSuccess("That's the right answer!!");
      setCurrQuestion(currQuestion + 1);
      inp.value = "";
      setLoading(false);
    } else {
      setScore(0);
      setError("Wrong Answer 😞 Try Again...");
      inp.value = "";
      setLoading(false);
    }
  };

  return complete ? (
    <div className="flex flex-col gap-12 w-full h-[90vh] mx-auto my-auto justify-center items-center">
      <div className="flex w-[50%] h-[10%] justify-center items-center text-center font-bold bg-green-400 text-white rounded-xl">
        Congratulations! You got all the cards right!
      </div>
      <button className="rounded-xl btn btn-primary">
        <a href="/quiz" className="text-center">
          Play Again?
        </a>
      </button>
      <p className="py-5">
        <abbr title="Streak">🔥</abbr>
        {score}
      </p>
    </div>
  ) : (
    <div className="flex flex-col gap-12 w-full h-[90vh] mx-auto my-auto justify-center items-center">
      {success && (
        <div className="flex w-[50%] h-[10%] justify-center items-center text-center font-bold bg-green-400 text-white rounded-xl">
          {success}
        </div>
      )}
      <div className="flex flex-col gap-12 justify-center items-center text-center h-[50%] w-[50%]">
        <div className="flex flex-row rounded-xl h-full w-full bg-red-400 text-white text-3xl font-semibold p-10 text-center justify-center items-center">
          {questions[currQuestion].question}
        </div>
        <div>
          {error && <p className="text-red-400 pb-5">{error}</p>}
          <form className="flex flex-row">
            <input
              type="text"
              id="answer"
              onChange={(e) => setCurrAnswer(e.target.value)}
              placeholder="Enter your answer here"
              required
              className="flex input input-bordered w-full max-w-xs"
            />
            <button
              className="mx-5 btn btn-primary rounded-full"
              onClick={handleSubmit}
              disabled={loading}
              type="submit"
            >
              Submit
            </button>
          </form>
          <p className="py-5">
            <abbr title="Streak">🔥</abbr>
            {score}
          </p>
        </div>
      </div>
    </div>
  );
}
