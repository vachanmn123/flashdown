"use client";

import { useState } from "react";

export default function FlashCard({ card, color }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleDelete = async () => {
    const conf = confirm("Are you sure you want to delete this card?");
    if (!conf) return;
    const res = await fetch(`/api/cards/${card.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      window.location.reload();
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={
        "flex flex-col p-5 rounded-xl shadow-xl text-white justify-center align-middle w-[100%] " +
        color
      }
      style={{
        transform: showAnswer
          ? " perspective(600px) rotateY(180deg)"
          : "perspective(600px) rotateY(0deg)",
        transition: "transform 0.5s linear",
      }}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      {showAnswer ? (
        <>
          <div className="absolute left-5 top-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={handleDelete}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2
            className="text-xl md:text-3xl"
            style={{
              transform: "rotateY(180deg)",
            }}
          >
            {card.answer}
            <br />
            <span className="text-sm">
              <span className="lg:hidden">Tap to hide answer</span>
              <span className="hidden lg:block">Click to hide answer</span>
            </span>
          </h2>
        </>
      ) : (
        <h2 className="text-xl md:text-3xl">
          {card.question}
          <br />
          <span className="text-sm">
            <span className="lg:hidden">Tap to show answer</span>
            <span className="hidden lg:block">Click to show answer</span>
          </span>
        </h2>
      )}
    </div>
  );
}
