"use client";

import React, { useState } from "react";

function AddFlashCard() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        answer: answer,
      }),
    });
    if (res.status === 200) {
      setQuestion("");
      setAnswer("");
      window.location.href = "/cards";
    } else {
      setError("Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-wrap p-4 justify-center items-center gap-12 w-full h-full">
      {error ? (
        <div className="alert alert-error">
          <div className="flex-1">
            <label>{error}</label>
          </div>
        </div>
      ) : null}
      <h1 className="text-2xl font-bold mb-4">Create a New Flash Card</h1>
      {submitting ? (
        <div className="w-full h-full">submitting...</div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 form-control w-full max-w-xs">
              <label htmlFor="question" className="label">
                <span className="label-left">Question</span>
              </label>
              <input
                type="text"
                id="question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Enter your question here"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="mb-4 form-control w-full max-w-xs">
              <label htmlFor="answer" className="label">
                <span className="label-left">Answer</span>
              </label>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Enter your answer here"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <button type="submit" className="btn btn-primary my-3">
              Create Flash Card
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddFlashCard;
