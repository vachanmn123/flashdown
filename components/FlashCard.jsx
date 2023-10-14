"use client";

import { useState } from "react";

export default function FlashCard({ card, color }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      className={
        "flex flex-col p-5 rounded-xl shadow-xl text-white justify-center align-middle w-[100%] " +
        color
      }
      onClick={() => setShowAnswer(!showAnswer)}
    >
      {showAnswer ? (
        <h2 className="text-3xl">
          {card.answer}
          <br />
          <span className="text-sm">
            <span className="lg:hidden">Tap to hide answer</span>
            <span className="hidden lg:block">Click to hide answer</span>
          </span>
        </h2>
      ) : (
        <h2 className="text-3xl">
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
